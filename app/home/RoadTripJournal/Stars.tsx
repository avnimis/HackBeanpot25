import AntDesign from '@expo/vector-icons/AntDesign';
import { View } from "react-native";


interface StarsProps {
    rating: number;
}

export default function Stars({rating}: StarsProps){
    const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<AntDesign name="star" size={24} color="yellow" />); //Full star
    } else if (rating >= i - 0.5) {
      stars.push(<AntDesign name="star" size={24} color="yellow" />); //Half star
    }
  }

  return <View className="review-stars">{stars}</View>;
}