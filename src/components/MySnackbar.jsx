import React from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, Text } from "react-native";
import { colors } from "../global/colors";

/**
 * MySnackbar component for displaying a Snackbar notification.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isVisible - Determines the visibility of the Snackbar.
 * @param {string} props.message - The message text to display in the Snackbar.
 * @param {function} props.onDismiss - Callback function when the Snackbar is dismissed.
 * @param {function} props.onPressAction - Callback function when the "Ok" action button is pressed.
 * @returns {JSX.Element} - MySnackbar component.
 */
export default function MySnackbar({
    isVisible,
    message,
    onDismiss,
    onPressAction,
}) {
    return (
        <Snackbar
            visible={isVisible}
            onDismiss={onDismiss}
            action={{
                label: "Ok",
                onPress: onPressAction,
                labelStyle: { color: colors.FONT, fontFamily: "NunitoBold" },
            }}
            style={{ backgroundColor: colors.SECONDARY }}
        >
            <Text style={styles.snackbar}>{message}</Text>
        </Snackbar>
    );
}

const styles = StyleSheet.create({
    snackbar: {
        fontSize: 14,
        fontFamily: "NunitoBold",
        color: colors.FONT,
    },
});
