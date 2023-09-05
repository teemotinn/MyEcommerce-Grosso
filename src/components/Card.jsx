import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../global/colors';

/**
  * Reusable card component that can be used in various parts of the application.
  *
  * @param {object} props - Component properties.
  * @param {React.ReactNode} props.children - Content inside the card.
  * @param {Array} props.additionalStyle - Additional styles to customize the card.
  * @param {function} props.onPress - Callback function when card is pressed.
  * @returns {JSX.Element} - Card element.
  */

export default function Card({
    children,
    additionalStyle = [],
    onPress,
}) {
    return (
        <TouchableOpacity
            disabled={!onPress}
            onPress={onPress}
            style={[styles.container, additionalStyle]}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: colors.CARD_BACKGROUND,
        shadowColor: "#000",
        borderRadius: 8,
        marginBottom: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
