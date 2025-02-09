import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import DaySection from "./DaySection";
import { StopData } from "./JournalItem";
import Header from '@/app/components/Header';

interface DayData {
    day: number;
    month: number;
    year: number;
    items: StopData[];
}

export type RoadTripData = {
    id: number,
    title: string,
    progress: number,
    startDate: string,
    endDate: string,
};

export default function RoadTripJournal() {

    const roadtrip: RoadTripData = {
        id: 1,
        title: "Yellowstone",
        progress: 75,
        startDate: "2024-02-08",
        endDate: "2024-02-15"
      };

    const {id, title, progress, startDate, endDate} = roadtrip;

    const data: DayData[] = [
        {
            day: 1,
            month: 2,
            year: 2024,
            items: [
                {
                    id: 1,
                    name: "Sample Stop",
                    stars: 3,
                    starttime: 1045,
                    endtime: 1100,
                    image: "url"
                }
            ]
        }
        // Add more days as needed
    ];

    return (

        <SafeAreaView style={styles.safeArea}>
            <Header title={title} />
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <DaySection {...item} />}
                    keyExtractor={(item) => `${item.day}-${item.month}-${item.year}`}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        width: '100%',
    },
    headerText: {
        "color": "#2E2D4D",
        "fontSize": 25,
        "fontStyle": "normal",
        "fontWeight": "700",
      }
});