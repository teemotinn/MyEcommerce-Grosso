import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Card from './Card'

export default function CategoryItem(
    { item }
) {
    return (
        <Card>
            <Text style={styles.textCategory}>
                {item}
            </Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    textCategory: {
        fontSize: 18
    }
})