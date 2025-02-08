import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import ActiveRoadTrip from "./activeRoadTrip";
import { Link } from "expo-router";
function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <View style={styles.activeRoadTripContainer}>
        <ActiveRoadTrip />
      </View>
      <Link href="./home/startRoadTrip" asChild>
        <Pressable style={styles.startRoadTripButton}>
          <Text style={styles.startRoadTripText}>Add New Road Trip</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  header: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#337357",
    height: "12.5%",
    width: "100%",
  },
  headerText: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: 400,
    paddingBottom: 20,
  },
  startRoadTripButton: {
    width: "80%",
    display: "flex",
    paddingVertical: 26,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#337357",
    marginBottom: 40,
  },
  startRoadTripText: {
  color: "#FFF",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: 25,
  fontStyle: "normal",
  fontWeight: 400,
  },
  activeRoadTripContainer: {
    height: "70%",
    width: "80%",
  },
});

export default Home;