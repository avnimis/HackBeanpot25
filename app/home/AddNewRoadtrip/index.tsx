import React from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function AddNewRoadTrip() {
    
    function handleClick() {
        alert('Button clicked!');
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    defaultValue="New RoadTrip Name"
                />
            </View>

            <View style={styles.separator} />

            <View style={styles.locationContainer}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        defaultValue="Start Location"
                    />
                    <TextInput
                        style={styles.input}
                        defaultValue="End Location"
                    />
                </View>
            </View>

            <View style={styles.dateContainer}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        defaultValue="Start Date"
                    />
                    <TextInput
                        style={styles.input}
                        defaultValue="End Date"
                    />
                </View>
            </View>

            <TouchableOpacity 
                style={styles.button}
                onPress={handleClick}
            >
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    locationContainer: {
        marginBottom: 16,
    },
    dateContainer: {
        marginBottom: 16,
    },
    inputGroup: {
        gap: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 16,
    },
    button: {
        backgroundColor: '#6D9F71',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});