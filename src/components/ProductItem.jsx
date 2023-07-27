import React from 'react'
import { Image, StyleSheet, Text } from 'react-native'

import Card from './Card'
import { setSelectedProductId } from '../features/shop/shopSlice'
import { useDispatch } from 'react-redux'

export default function ProductItem({
    item,
    navigation
}) {
    const dispatch = useDispatch()

    const onSelectProduct = () => {
        dispatch(setSelectedProductId(item.id))
        navigation.navigate('ProductDetail')
    }

    return (
        <Card
            additionalStyle={styles.additionalStylesCard}
            onPress={onSelectProduct}
        >
            <Text
                style={styles.productTitle}>
                {item.title}sss
            </Text>
            <Image
                resizeMode='cover'
                style={styles.image}
                source={{ uri: item.images[0] }}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    productTitle: {
        width: '60%',
        fontFamily: 'Nunito'
    },
    image: {
        height: '100%',
        width: '40%',
        borderRadius: 8
    },
    additionalStylesCard: {
        height: 100,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
})