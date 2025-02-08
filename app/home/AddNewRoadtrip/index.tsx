import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddNewRoadTrip() {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    
    function handleClick() {
        alert('Button clicked!');
    }

    type DateTimePickerEvent = {
        type: 'set' | 'dismissed';
        nativeEvent: {
            timestamp?: number;
        };
    };
    
    return (
        <View id="add-new-rt" style={styles.headerContainer}>
            <View id="rt-name" style={styles.titleContainer}>
                <TextInput
                    style={styles.input}
                    defaultValue="New RoadTrip Name"
                />
                <MaterialIcons name="edit" size={24} color="#907F9F" />
            </View>

            <View style={styles.titleUnderline} />

            <View id="start-and-end-location" style={styles.inputContainer}>
                <View style={styles.inputRow}>
                    <MaterialIcons name="radio-button-unchecked" size={20} color="#6D9F71" />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Location"
                    />
                </View>
                <View style={styles.inputRow}>
                    <MaterialIcons name="location-on" size={20} color="#6D9F71" />
                    <TextInput
                        style={styles.input}
                        placeholder="End Location"
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TouchableOpacity 
                    style={styles.inputRow}
                    onPress={() => setShowStartPicker(true)}
                >
                    <MaterialIcons name="calendar-today" size={20} color="#6D9F71" />
                    <TextInput
                        style={styles.input}
                        value={startDate.toLocaleDateString()}
                        editable={false}
                        placeholder="Start Date"
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.inputRow}
                    onPress={() => setShowEndPicker(true)}
                >
                    <MaterialIcons name="calendar-today" size={20} color="#6D9F71" />
                    <TextInput
                        style={styles.input}
                        value={endDate.toLocaleDateString()}
                        editable={false}
                        placeholder="End Date"
                    />
                </TouchableOpacity>
            </View>

            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                />
            )}

            <TouchableOpacity 
                style={styles.addButton}
                onPress={handleClick}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    headerContainer: {
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    titleText: {
        fontSize: 24,
        color: '#907F9F',
        fontWeight: '500',
    },
    titleUnderline: {
        height: 1,
        backgroundColor: '#6D9F71',
        width: '100%',
    },
    inputContainer: {
        gap: 20,
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
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
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
    },
    addButton: {
        backgroundColor: '#6D9F71',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
    icon: {
        color: '#6D9F71',
    },
    editIcon: {
        color: '#907F9F',
    },
});
