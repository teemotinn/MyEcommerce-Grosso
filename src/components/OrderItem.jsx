import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Card from "./Card"
import { colors } from "../global/colors"

const OrderItem = ({ order }) => {
    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );

    return (
        <Card additionalStyle={styles.additionalStylesCard}>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                    {new Date(order.createdAt).toLocaleString()}
                </Text>
                <Text style={styles.detailText}>${total}</Text>
            </View>
            <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </Card>
    );
};

export default OrderItem;

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