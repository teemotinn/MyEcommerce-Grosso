import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colors } from '../global/colors';

/**
 * ModalMessage component for displaying a message within a modal.
 *
 * @param {object} props - Component props.
 * @param {string} props.children - The message content to display.
 * @returns {JSX.Element} - ModalMessage component.
 */
export default function ModalMessage({
    children
}) {
    return (
        <View>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: 'Nunito',
        color: colors.FONT,
    }
});
