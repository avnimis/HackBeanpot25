from flask import Blueprint, jsonify, request
from app.database import supabase  # Import Supabase client

stops_bp = Blueprint("stops", __name__)

# CREATE A STOP
@stops_bp.route("/", methods=["POST"])
def create_stop():
    try:
        data = request.json
        required_fields = ["trip_id", "latitude", "longitude", "location_name", "category", "visit_duration", "photo_url", "activity_type"]

        for field in required_fields:
            if field not in data:
                return jsonify({"success": False, "error": f"Missing required field: {field}"}), 400

        response = supabase.table("stops").insert({
            "trip_id": data["trip_id"],
            "latitude": data["latitude"],
            "longitude": data["longitude"],
            "location_name": data["location_name"],
            "category": data["category"],
            "visit_duration": data["visit_duration"],
            "notes": data.get("notes", None),
            "photo_url": data["photo_url"],
            "activity_type": data["activity_type"]
        }).execute()

        return jsonify({"success": True, "stop": response.data}), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# GET A SINGLE STOP BY ID
@stops_bp.route("/<int:stop_id>", methods=["GET"])
def get_stop(stop_id):
    try:
        response = supabase.table("stops").select("*").eq("id", stop_id).single().execute()

        if not response.data:
            return jsonify({"success": False, "error": "Stop not found"}), 404

        return jsonify({"success": True, "stop": response.data}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# GET ALL STOPS FOR A TRIP (Ordered by visited_at)
@stops_bp.route("/trip/<int:trip_id>", methods=["GET"])
def get_stops_for_trip(trip_id):
    try:
        response = supabase.table("stops").select("*").eq("trip_id", trip_id).order("visited_at", desc=False).execute()

        return jsonify({"success": True, "stops": response.data}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# DELETE A STOP BY ID
@stops_bp.route("/<int:stop_id>/delete", methods=["DELETE"])
def delete_stop(stop_id):
    try:
        response = supabase.table("stops").delete().eq("id", stop_id).execute()

        if response.data is None:
            return jsonify({"success": False, "error": "Stop not found"}), 404

        return jsonify({"success": True, "message": "Stop deleted"}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
