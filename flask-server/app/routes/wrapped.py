from flask import Blueprint, jsonify, request
from app.database import supabase
from geopy.distance import geodesic
import requests

wrapped_bp = Blueprint("wrapped", __name__)

DEEPSEEK_API_KEY = "Sk-805d4623d030413bb6c093b76be82c0b"

@wrapped_bp.route("/<int:trip_id>/wrapped", methods=["POST"])
def generate_wrapped(trip_id):
    try:
        # 1️⃣ Fetch trip data (Start & End Coordinates)
        trip_response = supabase.table("trips").select("*").eq("id", trip_id).single().execute()
        if not trip_response.data:
            return jsonify({"success": False, "error": "Trip not found"}), 404

        trip = trip_response.data
        start_coords = (trip["start_latitude"], trip["start_longitude"])
        end_coords = (trip["end_latitude"], trip["end_longitude"])

        # 2️⃣ Fetch all stops for the trip (ordered by visited_at)
        stops_response = supabase.table("stops").select("*").eq("trip_id", trip_id).order("visited_at").execute()
        stops = stops_response.data if stops_response.data else []

        # 3️⃣ Calculate Total Distance Traveled
        total_distance = 0.0
        previous_coords = start_coords

        for stop in stops:
            current_coords = (stop["latitude"], stop["longitude"])
            total_distance += geodesic(previous_coords, current_coords).miles
            previous_coords = current_coords

        # Add final leg from last stop to end location
        total_distance += geodesic(previous_coords, end_coords).miles

        # 4️⃣ Generate Trip Summary Sentences (DeepSeek)
        trip_stats = f"You made {len(stops)} stops on this trip, visited {len(set(stop['category'] for stop in stops))} attractions, and drove {round(total_distance, 1)} miles."
        
        deepseek_payload = {
            "model": "deepseek-chat",
            "messages": [
                {"role": "system", "content": "Generate a fun and engaging summary of a road trip."},
                {"role": "user", "content": f"Trip details: {trip_stats}. Stops: {stops}"}
            ],
            "max_tokens": 200
        }

        deepseek_headers = {"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"}
        deepseek_response = requests.post("https://api.deepseek.com/v1/chat/completions", json=deepseek_payload, headers=deepseek_headers)
        deepseek_data = deepseek_response.json()
        generated_summary = deepseek_data.get("choices", [{}])[0].get("message", {}).get("content", "No summary generated.")

        # 5️⃣ Select 4 Highlighted Stops (Include Photo URLs if Available)
        highlighted_stops = []
        for stop in stops[:4]:  # Max 4 stops
            highlighted_stops.append({
                "sentence": f"One highlight of your trip was {stop['location_name']}.",
                "photo_url": stop.get("photo_url", None)
            })

        # 6️⃣ Return Wrapped Data
        wrapped_data = {
            "success": True,
            "trip_stats": trip_stats,
            "generated_summary": generated_summary,
            "highlighted_stops": highlighted_stops
        }

        return jsonify(wrapped_data), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
