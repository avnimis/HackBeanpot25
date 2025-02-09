import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Href } from "expo-router";
import BottomButton from "@/components/BottomButton";
import { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from "expo-image-picker";

interface InputsProps {
  header: string;
  icon: IconProp;
  titlePlaceholder: string;
}

export type InputData = {
  title: string;
  description: string;
  image: string;
};

function Add({ header, icon, titlePlaceholder }: InputsProps) {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const add = () => {};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.cameraContainer}>
            <FontAwesomeIcon icon={icon} size={40} style={styles.camera} />
          </View>

          <TextInput
            style={styles.title}
            placeholder={titlePlaceholder}
            placeholderTextColor="#907F9F"
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <Pressable style={styles.addImage} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text>Add Image</Text>
          )}
        </Pressable>
        <TextInput
          style={styles.description}
          placeholder="Description"
          placeholderTextColor="#907F9F"
          onChangeText={setDescription}
          value={description}
          multiline
        />

        <BottomButton text="Add" onPress={add} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#907F9F",
    fontFamily: "Montserrat",
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 0,
    borderColor: "#000",
    borderBottomWidth: 1,
    padding: 10,
    paddingBottom: 0,
    width: "80%",
  },
  description: {
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    width: "90%",
    height: "20%",
    padding: 10,
  },
  camera: {
    color: "#FFF",
  },
  cameraContainer: {
    backgroundColor: "#337357",
    width: 88,
    height: 87,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "80%",
    marginRight: 40,
  },
  addImage: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    width: "90%",
    height: "30%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default Add;
