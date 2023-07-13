import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../global/colors'

export default function Search({
    onSearch,
    onErase,
    error = "",
}) {
    const [keyword, setKeyword] = useState("")

    return (
        <View style={styles.container}>
            <View style={styles.toolsContainer}>
                <TextInput style={styles.input}
                    placeholder='Search...'
                    value={keyword}
                    onChangeText={setKeyword}
                />
                <Pressable style={styles.toolButton} onPress={() => onSearch(keyword)}>
                    <FontAwesome name="search" size={22} color="black" />
                </Pressable>
                <Pressable style={styles.toolButton} onPress={() => onErase()}>
                    <FontAwesome5 name="eraser" size={22} color="black" />
                </Pressable>
            </View>

            {!!error &&
                <Text>
                    {error}
                </Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toolsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolButton: {
        paddingLeft: 8
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 18,
        backgroundColor: colors.SECONDARY,
        borderRadius: 10,
    }
})