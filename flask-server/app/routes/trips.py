from flask import Blueprint, jsonify, request
from app.database import supabase

trips_bp = Blueprint('trips', __name__)

@trips_bp.route('/user/<int:user_id>', methods=['GET'])
def get_trips_for_user(user_id):
    try:
        response = supabase.table("trips").select("*").eq("user_id", user_id).execute()
        print("Raw Supabase Response:", response)  # Debugging
        trips = response.data  # Ensure we're extracting `.data`
        return jsonify({"success": True, "trips": trips}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@trips_bp.route('/', methods=['POST'])
def create_trip():
    data = request.get_json()
    user_id = data.get("user_id")
    start_latitude = data.get("start_latitude")
    start_longitude = data.get("start_longitude")
    end_latitude = data.get("end_latitude")
    end_longitude = data.get("end_longitude")

    if not user_id or start_latitude is None or start_longitude is None or end_latitude is None or end_longitude is None:
        return jsonify({"success": False, "error": "Missing required fields"}), 400

    try:
        response = supabase.table("trips").insert({
            "user_id": user_id,
            "start_latitude": start_latitude,
            "start_longitude": start_longitude,
            "end_latitude": end_latitude,
            "end_longitude": end_longitude
        }).execute()

        return jsonify({"success": True, "trip": response.data}), 201
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

