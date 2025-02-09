import { View, StyleSheet, Text, FlatList } from "react-native";
import DaySection from "./DaySection";



export default function RoadTripJournal() {
    

    const data = [
        {/* all the stops data arranged by day potentially */}
    ]

    return (
        <View> 

            <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <DaySection day={0} month={0} year={0} {...item} />}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        "display": "flex",
        "width": 392,
        "flexDirection": "column",
        "alignItems": "flex-start",
        "gap": 10
    }
})


