import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch } from "react-redux"
import { removeCartItem } from "../features/cart/cartSlice"
import Card from "./Card"
import { colors } from "../global/colors"

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch()

    const onDeleteProduct = () => {
        dispatch(removeCartItem({
            ...cartItem
        }))
    }

    return (
        <Card additionalStyle={styles.additionalStylesCard}>
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.titleText}>{cartItem.title} ({cartItem.quantity})</Text>
                <Text numberOfLines={1} style={styles.detailText}>{cartItem.brand}</Text>
                <Text numberOfLines={1} style={styles.detailText}>${cartItem.price}</Text>
            </View>
            <TouchableOpacity onPress={onDeleteProduct}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
            </TouchableOpacity>
        </Card>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    additionalStylesCard: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    textContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    titleText: {
        fontFamily: 'Nunito',
        fontSize: 18,
        color: colors.FONT,
    },
    detailText: {
        fontFamily: 'Nunito',
        fontSize: 14,
        color: colors.FONT,
    },
});