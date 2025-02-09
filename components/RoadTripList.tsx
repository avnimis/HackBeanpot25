import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import RoadTrip from "./RoadTrip";
import type { RoadTripData } from "./RoadTrip";
function ActiveRoadTrip() {
  const [isLoading, setLoading] = useState(true);
  const [roadTripData, setRoadTripData] = useState<RoadTripData[]>([]);
  const getRoadTrips = async () => {
    try {
      //const roadTripData = await fetch("https://my-json-server.typicode.com/hbessette/demo").then((response) => response.json());
      const roadTripData = [
        {
          id: "1",
          title: "Yellowstone",
          status: 0,
          progress: 80,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "3",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "4",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "5",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "6",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "7",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "8",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "9",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "10",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "11",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "12",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
        {
          id: "13",
          title: "Everglades",
          status: 1,
          progress: 20,
          startDate: "11/17/2025",
          endDate: "11/22/2025",
        },
      ];
      setRoadTripData(roadTripData);
    } catch (error) {
      console.error("Error fetching road trips:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoadTrips();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Road Trips</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={roadTripData}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <RoadTrip {...item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "95%",
  },
  header: {
    height: "10%",
    justifyContent: "center",
    borderBottomColor: "#337357",
    borderBottomWidth: 2,
  },
  headerText: {
    color: "#2E2D4D",
    fontFamily: "Montserrat",
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 0,
  },
});

export default ActiveRoadTrip;
