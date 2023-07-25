import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { colors } from '../global/colors'

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
        paddingVertical: 6,
        paddingHorizontal: 12,
        width: '100%',
        alignSelf: 'stretch',
        borderWidth: 0.5,
        backgroundColor: colors.SECONDARY,
        borderColor: 'black',
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