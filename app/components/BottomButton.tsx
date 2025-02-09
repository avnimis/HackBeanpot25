import { StyleSheet, Pressable, Text } from "react-native";
import { Href, Link } from "expo-router";

interface BottomButtonProps {
    text?: string;
    href?: Href;
    onPress?: () => void;
}

function BottomButton({ text, href, onPress }: BottomButtonProps) {
    if (href && onPress) {
        return (
        <Link href={href} asChild>
            <Pressable style={styles.buttonContainer} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </Link>
        )
    } else if (href){
        return (
            <Link href={href} asChild>
                <Pressable style={styles.buttonContainer}>
                    <Text style={styles.text}>{text}</Text>
                </Pressable>
            </Link>
        )
    } else {
        return (
            <Pressable style={styles.buttonContainer} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    display: "flex",
    paddingVertical: 26,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: "#337357",
    marginBottom: 40,
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: 400,
  },
});

export default BottomButton