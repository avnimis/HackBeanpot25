import { Text, View, StyleSheet } from "react-native";
import RoadTripList from "@/components/RoadTripList";
import CircleButton from "@/components/CircleButton";
import React, { useEffect } from "react";
import { useNavigation, Link } from "expo-router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "expo-router";

function Home() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#337357" },
      headerTintColor: "#FFFFFF",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.activeRoadTripContainer}>
        <RoadTripList />
      </View>
      <View style={styles.buttonContainer}>
        <CircleButton
          icon={faPlus}
          onPress={() => router.push("/home/AddNewRoadTrip")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    alignItems: "center",
  },
  buttonContainer: {},
  activeRoadTripContainer: {
    height: "90%",
    width: "80%",
    alignSelf: "center",
  },
});

export default Home;
