
import { Href, Link } from "expo-router";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
function Inputs() {

  const addComponents = [
    ["Attraction", "AddAttraction"],
    ["Gas Station", "AddGasStation"],
    ["Rest Stop", "AddRestStop"],
    ["Restaurant", "AddRestaurant"],
  ]
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.List}
        data={addComponents}
        renderItem={({ item }) => (
          // @ts-ignore
          <Link style={styles.AddItemContainer} href={`/home/startRoadTrip/inputs/${item[1]}` as const} asChild>
            <Pressable>
              <Text>{item[0]}</Text>
            </Pressable>
          </Link>
        )}
        keyExtractor={(item) => item[1]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  AddItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: "90%",
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  List: {
    width: "90%",
  }
});

export default Inputs;