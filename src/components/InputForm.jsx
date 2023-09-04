import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../global/colors';

/**
 * InputForm component for displaying a labeled input field.
 *
 * @param {object} props - Component props.
 * @param {string} props.label - The label for the input field.
 * @param {function} props.onChange - Callback function to handle input changes.
 * @param {string} props.error - Error message to display (optional).
 * @param {boolean} props.isSecure - Flag to indicate if the input is a secure (password) field.
 * @returns {JSX.Element} - InputForm component.
 */
const InputForm = ({
    label, 
    onChange, 
    error = "",
    isSecure = false
}) => {
    const [input, setInput] = useState("");
    const onChangeText = (text) => {
        setInput(text);
        onChange(text);
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>{label}</Text>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={onChangeText}
                secureTextEntry={isSecure}
            />
            {error ? 
                <Text style={styles.error}>
                    {error}
                </Text>
                :
                null
            }
        </View>
    );
}

export default InputForm;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    subtitle: {
        width: '90%',
        fontSize: 16,
        fontFamily: 'Nunito'
    },
    error: {
        fontSize: 16,
        color: 'red',
        fontFamily: 'Nunito',
        fontStyle: 'italic',
    },
    input: {
        width: '90%',
        borderWidth: 0,
        borderBottomWidth: 3,
        borderBottomColor: colors.PRIMARY,
        padding: 2,
        fontFamily: 'Nunito',
        fontSize: 14,
    }
})
