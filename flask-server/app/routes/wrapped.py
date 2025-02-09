from flask import Blueprint, jsonify, request
from app.database import supabase
from dotenv import load_dotenv
from geopy.distance import geodesic
import requests
import os
import re

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

wrapped_bp = Blueprint("wrapped", __name__)

@wrapped_bp.route("/<int:trip_id>/wrapped", methods=["POST"])
def generate_wrapped(trip_id):
    try:
        print(f"🚀 Generating wrapped summary for trip ID: {trip_id}")

        # Fetch trip data (Start & End Coordinates)
        trip_response = supabase.table("trips").select("*").eq("id", trip_id).single().execute()
        if not trip_response.data:
            return jsonify({"success": False, "error": "Trip not found"}), 404

        trip = trip_response.data
        start_coords = (trip["start_latitude"], trip["start_longitude"])
        end_coords = (trip["end_latitude"], trip["end_longitude"])

        # Fetch stops for the trip (ordered by visited_at)
        stops_response = supabase.table("stops").select("*").eq("trip_id", trip_id).order("visited_at").execute()
        stops = stops_response.data if stops_response.data else []

        # Calculate total distance traveled
        total_distance = 0.0
        previous_coords = start_coords
        for stop in stops:
            current_coords = (stop["latitude"], stop["longitude"])
            total_distance += geodesic(previous_coords, current_coords).miles
            previous_coords = current_coords
        total_distance += geodesic(previous_coords, end_coords).miles

        # Generate trip statistics
        trip_stats = (
            f"You made {len(stops)} stops, visited {len(set(stop['category'] for stop in stops))} attractions, "
            f"and traveled {round(total_distance, 1)} miles."
        )

        # Prepare OpenAI request for AI-generated trip summary
        openai_payload = {
            "model": "gpt-4",
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are a skilled travel storyteller. Provide a concise yet engaging trip summary with a structured format: "
                        "Start with 3 general sentences about the journey, then describe each stop in 1 sentence only. "
                        "Use an immersive tone but avoid exaggerated storytelling or fictional events."
                    )
                },
                {
                    "role": "user",
                    "content": (
                        f"You took an epic road trip covering {round(total_distance, 1)} miles, making {len(stops)} unforgettable stops. "
                        f"You explored {len(set(stop['category'] for stop in stops))} unique types of attractions. "
                        f"Each stop had its own story to tell, creating a journey worth remembering.\n"
                        + "\n".join(
                            [f"- {stop['location_name']}: {stop.get('notes', 'A memorable stop.')}" for stop in stops[:4]]
                        )
                    )
                }
            ],
            "max_tokens": 300
        }

        openai_headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
        openai_response = requests.post("https://api.openai.com/v1/chat/completions", json=openai_payload, headers=openai_headers)

        if openai_response.status_code != 200:
            return jsonify({"success": False, "error": "OpenAI API request failed"}), 500

        openai_data = openai_response.json()
        generated_summary = openai_data.get("choices", [{}])[0].get("message", {}).get("content", "No summary generated.")
        generated_summary = re.sub(r"\s*\n\s*", " ", generated_summary).strip()

        # Highlighted stops (max 4)
        highlighted_stops = [
            {
                "sentence": f"{stop['location_name']}: {stop.get('notes', 'A notable stop.')}",
                "photo_url": stop.get("photo_url", None)
            }
            for stop in stops[:4]
        ]

        # Return structured response
        return jsonify({
            "success": True,
            "trip_stats": trip_stats,
            "generated_summary": generated_summary,
            "highlighted_stops": highlighted_stops
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
