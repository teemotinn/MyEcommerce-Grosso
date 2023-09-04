import React from "react"
import { StyleSheet, Text, View } from "react-native"

import Card from "./Card"
import { colors } from "../global/colors"

const OrderItem = ({ order }) => {

    return (
        <Card additionalStyle={styles.additionalStylesCard}>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>
                    {order.updatedAt.toLocaleString()}
                </Text>
                <Text style={styles.detailText}>${order.total}</Text>
            </View>
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
        fontSize: 14,
        color: colors.FONT,
    },
    detailText: {
        fontFamily: 'NunitoBold',
        fontSize: 18,
        color: colors.FONT,
    },
});