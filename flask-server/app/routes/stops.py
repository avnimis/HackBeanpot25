from flask import Blueprint, jsonify, request
from app.database import supabase

stops_bp = Blueprint('stops', __name__)

@stops_bp.route('/', methods=['POST'])
def create_stop():
    data = request.get_json()
    user_id = data.get("user_id")
    trip_id = data.get("trip_id")
    latitude = data.get("latitude")
    longitude = data.get("longitude")
    photo_url = data.get("photo_url")

    try:
        response = supabase.table("stops").insert({
            "user_id": user_id,
            "trip_id": trip_id,
            "latitude": latitude,
            "longitude": longitude,
            "photo_url": photo_url  # Save the image URL in Supabase
        }).execute()

        return jsonify({"success": True, "stop": response.data}), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
