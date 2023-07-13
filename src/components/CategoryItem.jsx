import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Card from './Card'

export default function CategoryItem({
    item,
    setCategorySelected
}) {
    return (
        <Card
            onPress={() => setCategorySelected(item)}
        >
            <Text style={styles.textCategory}>
                {item}
            </Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    textCategory: {
        width: 180,
        fontSize: 18,
        fontFamily: 'Nunito'
    },
})