import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'

export default function Card(
    { children }
) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 240,
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