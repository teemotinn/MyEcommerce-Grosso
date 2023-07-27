import React from 'react'
import { StyleSheet, Text } from 'react-native'

import Card from './Card'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../features/shop/shopSlice'

export default function CategoryItem({
    item,
    navigation
}) {

    const dispatch = useDispatch()

    const onSelectCategory = () => {
        dispatch(setCategorySelected(item))
        navigation.navigate('ItemListCategory')
    }

    return (
        <Card
            onPress={onSelectCategory}
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