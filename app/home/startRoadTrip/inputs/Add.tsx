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
import BottomButton from "@/app/components/BottomButton";
import { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from "expo-image-picker";
import Header from "@/app/components/Header";
import { MaterialIcons } from "@expo/vector-icons";

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
  const navItems: Array<[string, Href]> = [
    ["Home", "/home"],
  ]



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

  const add = async () => {
    if (!title || !description || !image) {
      alert("Please fill in all fields.");
      return;
    }
  
    const stopData = {
      trip_id: 1, 
      latitude: "0.0000", 
      longitude: "0.0000", 
      location_name: title,
      category: "General", 
      visit_duration: "1 hour", 
      photo_url: image,
      activity_type: "Sightseeing", 
    };
  
    try {
      const response = await fetch("http://your-backend-ip:5000/stops/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stopData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert("Stop added successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add stop. Please try again.");
    }
  };


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Header title={header} />
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

          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <View style={styles.iconColumn}>
                <MaterialIcons
                  name="radio-button-unchecked"
                  size={20}
                  style={styles.icon}
                />
                <View style={styles.dotConnector} />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Start Latitude"
                placeholderTextColor="#907F9F"
              />
              <TextInput
                style={styles.input}
                placeholder="Start Longitude"
                placeholderTextColor="#907F9F"
              />
            </View>

            <View style={styles.inputRow}>
              <MaterialIcons name="location-on" size={24} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="End Latitude"
                placeholderTextColor="#907F9F"
              />
              <TextInput
                style={styles.input}
                placeholder="End Longitude"
                placeholderTextColor="#907F9F"
              />
            </View>
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
    inputContainer: {
      gap: 20,
      marginBottom: 20,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      paddingHorizontal: 10,
    },
    iconColumn: {
      alignItems: 'center',
      gap: 4,
    },
    dotConnector: {
      width: 1,
      height: 20,
      backgroundColor: '#6D9F71',
    },
    input: {
      flex: 1,
      height: 48,
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 24,
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#666666',
    },
    icon: {
      color: '#6D9F71',
    },
  });

  export default Add;
