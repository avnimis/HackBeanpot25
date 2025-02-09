from supabase import create_client

SUPABASE_URL = "https://mzudwypqzsydyunycnxu.supabase.co"  # Replace with your actual Supabase URL
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dWR3eXBxenN5ZHl1bnljbnh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODk4MjkxOCwiZXhwIjoyMDU0NTU4OTE4fQ.p1SdNVqHLfWbvXEIHqzCqWV_0hxRW_2ei8A6IHgc8q4"  # Replace with your actual Supabase API Key

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Try fetching any table (replace 'trips' with an actual table name)
try:
    response = supabase.table("trips").select("*").limit(1).execute()
    print("Response from Supabase:", response)
except Exception as e:
    print("Error connecting to Supabase:", e)


# import os
# from supabase import create_client, Client

# SUPABASE_URL = "https://mzudwypqzsydyunycnxu.supabase.co"
# SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dWR3eXBxenN5ZHl1bnljbnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5ODI5MTgsImV4cCI6MjA1NDU1ODkxOH0.E2IuMwDihj8kjUBdL_WJXeaKWo1lz9hi4zFNWN2U5Zc"

# supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
