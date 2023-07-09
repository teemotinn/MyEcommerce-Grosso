import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { colors } from '../global/colors'

export default function Header() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Header</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '10%',
        paddingTop: 10 + Constants.statusBarHeight,
        paddingHorizontal: 18,
        paddingBottom: 10,
        backgroundColor: colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20
    }
})