from flask import Blueprint, jsonify, request
from app.database import supabase
from geopy.distance import geodesic
import requests

wrapped_bp = Blueprint("wrapped", __name__)

@wrapped_bp.route("/<int:trip_id>/wrapped", methods=["POST"])
def generate_wrapped(trip_id):
    try:
        print(f"🚀 Generating wrapped summary for trip ID: {trip_id}")

        # 1️⃣ Fetch trip data (Start & End Coordinates)
        trip_response = supabase.table("trips").select("*").eq("id", trip_id).single().execute()
        print(f"🔍 Trip response: {trip_response}")

        if not trip_response.data:
            print("❌ Trip not found in database")
            return jsonify({"success": False, "error": "Trip not found"}), 404

        trip = trip_response.data
        start_coords = (trip["start_latitude"], trip["start_longitude"])
        end_coords = (trip["end_latitude"], trip["end_longitude"])
        print(f"📍 Trip Start: {start_coords}, End: {end_coords}")

        # 2️⃣ Fetch all stops for the trip (ordered by visited_at)
        stops_response = supabase.table("stops").select("*").eq("trip_id", trip_id).order("visited_at").execute()
        print(f"🛑 Stops response: {stops_response}")

        stops = stops_response.data if stops_response.data else []
        print(f"📌 Total stops found: {len(stops)}")

        # 3️⃣ Calculate Total Distance Traveled
        total_distance = 0.0
        previous_coords = start_coords

        for stop in stops:
            current_coords = (stop["latitude"], stop["longitude"])
            segment_distance = geodesic(previous_coords, current_coords).miles
            total_distance += segment_distance
            print(f"📏 Distance from {previous_coords} to {current_coords}: {segment_distance} miles")
            previous_coords = current_coords

        # Add final leg from last stop to end location
        final_leg_distance = geodesic(previous_coords, end_coords).miles
        total_distance += final_leg_distance
        print(f"🏁 Final leg distance: {final_leg_distance} miles")
        print(f"🚗 Total distance traveled: {total_distance} miles")

        # 4️⃣ Generate Trip Summary Sentences (OpenAI)
        trip_stats = f"You made {len(stops)} stops on this trip, visited {len(set(stop['category'] for stop in stops))} attractions, and drove {round(total_distance, 1)} miles."
        print(f"📊 Trip Stats: {trip_stats}")

        openai_payload = {
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "Generate a fun and engaging summary of a road trip."},
                {"role": "user", "content": f"Trip details: {trip_stats}. Stops: {stops}"}
            ],
            "max_tokens": 200
        }

        openai_headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}
        print("📡 Sending request to OpenAI API...")
        openai_response = requests.post("https://api.openai.com/v1/chat/completions", json=openai_payload, headers=openai_headers)

        if openai_response.status_code != 200:
            print(f"❌ OpenAI API Error: {openai_response.status_code}, Response: {openai_response.text}")
            return jsonify({"success": False, "error": "OpenAI API request failed"}), 500

        openai_data = openai_response.json()
        print(f"🤖 OpenAI Response: {openai_data}")

        generated_summary = openai_data.get("choices", [{}])[0].get("message", {}).get("content", "No summary generated.")
        print(f"📝 Generated Summary: {generated_summary}")

        # 5️⃣ Select 4 Highlighted Stops (Include Photo URLs if Available)
        highlighted_stops = []
        for stop in stops[:4]:  # Max 4 stops
            highlighted_stops.append({
                "sentence": f"One highlight of your trip was {stop['location_name']}.",
                "photo_url": stop.get("photo_url", None)
            })

        print(f"✨ Highlighted Stops: {highlighted_stops}")

        # 6️⃣ Return Wrapped Data
        wrapped_data = {
            "success": True,
            "trip_stats": trip_stats,
            "generated_summary": generated_summary,
            "highlighted_stops": highlighted_stops
        }

        print("✅ Successfully generated wrapped summary")
        return jsonify(wrapped_data), 200

    except Exception as e:
        print(f"🔥 Exception: {str(e)}")
        return jsonify({"success": False, "error": str(e)}), 500
