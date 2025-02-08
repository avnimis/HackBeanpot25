import { Text, View, Pressable, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
function Home() {
  return (
    <View>
      <Text>Home</Text>
      <Link href="./home/startRoadTrip" asChild>
        <Button title="Start Road Trip"/>
      </Link>
      <Link href="./home/activeRoadTrip" asChild>
        <Button title="Active Road Trips"/>
      </Link>
      <Link href="./home/AddNewRoadtrip" asChild>
        <Button title="Add Road Trips"/>
      </Link>
    </View>
  );
}

export default Home;