import { View, StyleSheet, Text, Image } from "react-native";
import Stars from "./Stars";

export interface StopData {
  id: number;
  name: string;
  stars: number;
  starttime: number;
  endtime: number;
  image: string;
}

export default function JournalItem({ name, stars, starttime, image }: StopData) {
  // Format time from 24hr format
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>{formatTime(starttime)}</Text>
        <Text style={styles.placeName}>{name}</Text>
        <Stars rating={stars} />
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 121,
    padding: 10,
    gap: 10,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  timeText: {
    fontSize: 15,
    fontWeight: '400',
  },
  placeName: {
    fontSize: 25,
    fontWeight: '400',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  }
});