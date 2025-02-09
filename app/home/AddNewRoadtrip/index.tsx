// import React, { useState, useEffect } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { PLACES_API_KEY } from "@env";
// import { useNavigation } from "expo-router";

// export default function AddNewRoadTrip() {
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [showStartPicker, setShowStartPicker] = useState(false);
//     const [showEndPicker, setShowEndPicker] = useState(false);

//     function handleClick() {
//         alert('Button clicked!');
//     }

//     return (

//       <View style={styles.container}>
//         <View style={styles.pageContainer}>
//           <View style={styles.headerContainer}>
//             <View style={styles.titleContainer}>
//               <TextInput
//                 style={styles.titleText}
//                 placeholder="New Roadtrip Name"
//                 placeholderTextColor="#907F9F"
//               />
//               <MaterialIcons name="edit" size={24} style={styles.editIcon} />
//             </View>
//             <View style={styles.titleUnderline} />
//           </View>

//           <View style={styles.inputContainer}>
//             <View style={styles.inputRow}>
//               <View style={styles.iconColumn}>
//                 <MaterialIcons
//                   name="radio-button-unchecked"
//                   size={20}
//                   style={styles.icon}
//                 />
//                 <View style={styles.dotConnector} />
//               </View>

//               <TextInput
//                 style={styles.input}
//                 placeholder="Start Latitude"
//                 placeholderTextColor="#907F9F"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Start Longitude"
//                 placeholderTextColor="#907F9F"
//               />
//             </View>

//             <View style={styles.inputRow}>
//               <MaterialIcons name="location-on" size={24} style={styles.icon} />
//               <TextInput
//                 style={styles.input}
//                 placeholder="End Latitude"
//                 placeholderTextColor="#907F9F"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="End Longitude"
//                 placeholderTextColor="#907F9F"
//               />
//             </View>

//             {/* Date inputs */}
//             <TouchableOpacity
//               style={styles.inputRow}
//               onPress={() => setShowStartPicker(true)}
//             >
//               <MaterialIcons
//                 name="calendar-today"
//                 size={20}
//                 style={styles.icon}
//               />
//               <DateTimePicker value={startDate} mode="date" display="default" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.inputRow}
//               onPress={() => setShowEndPicker(true)}
//             >
//               <MaterialIcons
//                 name="calendar-today"
//                 size={20}
//                 style={styles.icon}
//               />
//               <DateTimePicker value={endDate} mode="date" display="default" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.addButton} onPress={handleClick}>
//               <Text style={styles.buttonText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F9F9F9',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     pageContainer: {
//         width: "90%",
//         flex: 1,
//     },
//     headerContainer: {
//         paddingTop: 30,
//         marginBottom: 20,
//     },
//     titleContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 8,
//     },
//     titleText: {
//         fontSize: 24,
//         color: '#907F9F',
//         fontWeight: '500',
//     },
//     titleUnderline: {
//         height: 1,
//         backgroundColor: '#6D9F71',
//         width: '100%',
//     },
//     inputContainer: {
//         gap: 20,
//         marginBottom: 20,
//     },
//     inputRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 12,
//     },
//     iconColumn: {
//         alignItems: 'center',
//         gap: 4,
//     },
//     dotConnector: {
//         width: 1,
//         height: 20,
//         backgroundColor: '#6D9F71',
//     },
//     input: {
//         flex: 1,
//         height: 48,
//         borderWidth: 1,
//         borderColor: '#E5E5E5',
//         borderRadius: 24,
//         paddingHorizontal: 20,
//         fontSize: 16,
//         color: '#666666',
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 40,
//         left: 20,
//         right: 20,
//     },
//     addButton: {
//         backgroundColor: '#337357',
//         height: 56,
//         borderRadius: 28,
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     buttonText: {
//         color: '#FFFFFF',
//         fontSize: 18,
//         fontWeight: '500',
//     },
//     icon: {
//         color: '#6D9F71',
//     },
//     editIcon: {
//         color: '#907F9F',
//     },
// });

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from "react-native";
import { LocationObject } from "expo-location";
import { GOOG_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';

export default function AddNewRoadTrip() {
  const [roadTripName, setRoadTripName] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<LocationObject | null>(null);

  const handleAdd = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Start Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOG_API_KEY,
            language: "en",
          }}
          onPress={(data, details = null) => console.log(data)}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
            useOnPlatform: "web",
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>End Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOG_API_KEY,
            language: "en",
          }}
          onPress={(data, details = null) => console.log(data)}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url: "https://maps.googleapis.com/maps/api",
            useOnPlatform: "web",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 40,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  }
});
