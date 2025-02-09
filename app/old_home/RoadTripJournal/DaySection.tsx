import { View, StyleSheet, Text, FlatList } from "react-native";
import JournalItem from "./JournalItem";


interface Date {
    day: number
    month: number
    year: number
}


export default function DaySection(date: Date) {

    const {day, month, year} = date;
    const dateFormat = {day} + "/" + {month} + "/" + {year}
    const items  = [
        {
            id: 1,
            name: "string",
            stars: 3,
            starttime: 1045,
            endtime: 1100,
            image: "url"
        }
    ]

    return (
        <View>
            <Text> {dateFormat} </Text>
            <View style={styles.dayUnderline} />
            <FlatList
                data={items}
                renderItem={({ item }) => <JournalItem {...item} />}
                keyExtractor={(item) => item.id.toString()  }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: 393,
        height: 48,
        paddingTop: 12,
        paddingRight: 17,
        paddingBottom: 12,
        paddingLeft: 17,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 10
    },
    dayUnderline: {
        height: 1,
        backgroundColor: '#6D9F71',
        width: '100%',
    },
})

