import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface CircleButtonProps {
    icon: IconProp;
    onPress?: () => void;
}
export default function CircleButton({ icon, onPress } : CircleButtonProps) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { elevation: 12, shadowOpacity: 0.5, shadowRadius: 10 },
            ]}
            onPress={onPress}
      >
          <FontAwesomeIcon style={styles.icon} icon={icon} />
      </Pressable>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#337357",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  icon: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    },
  
});