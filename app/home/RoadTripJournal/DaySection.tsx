import { View, StyleSheet, Text, FlatList } from "react-native";
import JournalItem, { StopData } from "./JournalItem";

interface DaySectionProps {
  day: number;
  month: number;
  year: number;
  items: StopData[];
}

export default function DaySection({ day, month, year, items }: DaySectionProps) {
  const dateFormat = `${day}/${month}/${year}`;
  
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{dateFormat}</Text>
      <View style={styles.dayUnderline} />
      <FlatList
        data={items}
        renderItem={({ item }) => <JournalItem {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  dayUnderline: {
    height: 1,
    backgroundColor: '#6D9F71',
    width: '100%',
    marginBottom: 12,
  },
});