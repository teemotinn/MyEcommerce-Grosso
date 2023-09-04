import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../global/colors";

/**
 * Reusable custom button component for adding items.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - Text displayed on the button.
 * @param {function} props.onPress - Callback function when the button is pressed.
 * @param {string} props.color - Background color of the button.
 * @returns {JSX.Element} - Custom add button element.
 */

const AddButton = ({
    title = "",
    onPress = () => {},
    color = colors.pink,
}) => {
    return (
        <Pressable
            style={{ ...styles.button, backgroundColor: color }}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        width: "80%",
        borderWidth: 1,
        backgroundColor: colors.SECONDARY,
        justifyContent: "center",
        alignItems: "center",
        padding: 8
    },
    text: {
        fontFamily: "Nunito",
        fontSize: 18,
        color: colors.lightPink,
    },
});
