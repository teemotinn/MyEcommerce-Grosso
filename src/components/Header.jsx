import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors } from '../global/colors'

export default function Header({
    title,
    goBack
}) {
    return (
        <View style={styles.container}>
            {goBack &&
                <Pressable onPress={() => { goBack() }}>
                    <MaterialCommunityIcons name="chevron-left" size={34} color="black" style={styles.icon} />
                </Pressable>
            }
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '8%',
        paddingHorizontal: 18,
        paddingVertical: 10,
        backgroundColor: colors.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: 'NunitoBold'
    },
    icon: {
        marginEnd: 8
    }
})