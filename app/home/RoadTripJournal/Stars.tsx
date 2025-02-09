import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet } from "react-native";

interface StarsProps {
  rating: number;
}

export default function Stars({ rating }: StarsProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <AntDesign key={`star-${i}`} name="star" size={24} color="#FFD700" />
      );
    } else {
      stars.push(
        <AntDesign key={`star-${i}`} name="staro" size={24} color="#FFD700" />
      );
    }
  }
  return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});