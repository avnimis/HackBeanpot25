import { View, StyleSheet, Text } from "react-native";
import Stars from "./Stars";

export type StopData = {
    id: number,
    name: string,
    stars: number,
    starttime: number,
    endtime: number,
    image: string
};


export default function JournalItem(stopData: StopData) {
    
    const {id, name, stars, starttime, endtime, image} = stopData;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.timeText}> {starttime} </Text>
                <Text style={styles.placeName}> {name} </Text>
                <Stars rating={stars} />
            </View>
            {/* Image goes here */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        "display": "flex",
        "height": 121,
        "justifyContent": "center",
        "alignItems": "flex-start",
        "gap": 1,
        "alignSelf": "stretch"
    },
    textContainer: {
        "display": "flex",
        "width": 240,
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15,
        "flexDirection": "column",
        "justifyContent": "center",
        "alignItems": "flex-start",
        "gap": 10
    },
    timeText: {
        "color": "#000",
        "fontFamily": "Inter",
        "fontSize": 15,
        "fontStyle": "normal",
        "fontWeight": "400",
    },
    placeName:  {
        "color": "#000",
        "fontFamily": "Inter",
        "fontSize": 25,
        "fontStyle": "normal",
        "fontWeight": "400",
      }

});