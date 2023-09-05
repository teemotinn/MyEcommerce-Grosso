import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../global/colors';

/**
 * Search component for inputting search queries.
 *
 * @param {object} props - Component props.
 * @param {function} props.onSearch - Function to execute when searching.
 * @param {function} props.onErase - Function to execute when clearing the search input.
 * @param {string} [props.error] - Error message to display.
 * @returns {JSX.Element} - Search component.
 */
export default function Search({
    onSearch,
    onErase,
    error = '',
}) {
    const [keyword, setKeyword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.toolsContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Search...'
                    value={keyword}
                    onChangeText={setKeyword}
                />
                <Pressable style={styles.toolButton} onPress={() => onSearch(keyword)}>
                    <MaterialCommunityIcons name="magnify" size={24} color="black" />
                </Pressable>
                <Pressable style={styles.toolButton} onPress={() => onErase()}>
                    <MaterialCommunityIcons name="eraser" size={24} color="black" />
                </Pressable>
            </View>

            {!!error && (
                <Text style={styles.error}>{error}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.TERTIARY
    },
    toolsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolButton: {
        paddingLeft: 8,
    },
    input: {
        color: colors.FONT,
        fontFamily: 'NunitoBold',
        flex: 1,
        padding: 8,
        fontSize: 16
    },
    error: {
        fontFamily: 'NunitoBold',
        color: colors.ERROR_FONT
    }
});
