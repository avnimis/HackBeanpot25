import { Text, View, Pressable, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import MapView from 'react-native-maps';

function Home() {
  return (
    <View>
      
      <MapView style={styles.map}/>

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

const styles = StyleSheet.create({
  map: {
    width: '50%',
    height: '50%',
  }
})
