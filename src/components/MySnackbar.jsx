import { StyleSheet, Text } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
import { colors } from "../global/colors";

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
