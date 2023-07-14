import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { colors } from '../global/colors'
import { AntDesign } from '@expo/vector-icons'

export default function Header({
    title,
    goBack
}) {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            {goBack &&
                <Pressable onPress={() => { goBack() }}>
                    <AntDesign name="back" style={{ marginEnd: 8 }} size={24} color="black" />
                </Pressable>
            }
            <Text style={styles.title}>{title}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: 'NunitoBold'
    }
})