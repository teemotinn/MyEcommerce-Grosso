import { StyleSheet, Text } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
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

    function onDismiss() {
        return () => {
            onDismiss()
        }
    }

    return (
        <Snackbar
            style={styles.container}
            onDismiss={onDismiss?.()}
            visible={isVisible}
            action={{
                label: 'Ok',
                labelStyle: styles.actionLabel,
                onPress: () => {
                    onPressAction?.()
                },
            }}>
            <Text style={styles.snackbar}>{message}</Text>
        </Snackbar>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.SUCCESS_BACKGROUND
    },
    message: {
        fontSize: 14,
        fontFamily: 'Nunito',
        color: colors.FONT
    },
    actionLabel: {
        fontFamily: 'Nunito',
        color: colors.FONT
    }
})
