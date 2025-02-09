import { Text, View, StyleSheet} from "react-native";
import ActiveRoadTrip from "./activeRoadTrip";
import BottomButton from "../components/BottomButton";
import Header from "../components/Header";
import { Href } from "expo-router";
function Home() {
  const navItems: Array<[string, Href]> = [
    ["Home", "./home"],
    ["Add Attraction", "./home/startRoadTrip/inputs"]
  ];
  return (
    <View style={styles.container}>
      <Header title="Road Trip Manager" navItems={navItems} />
      <View style={styles.activeRoadTripContainer}>
        <ActiveRoadTrip />
      </View>
      <BottomButton text="Add New Road Trip" href="./home/startRoadTrip/inputs" />
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
  activeRoadTripContainer: {
    height: "70%",
    width: "80%",
  },
});

export default Home;