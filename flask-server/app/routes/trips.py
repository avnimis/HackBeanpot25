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

