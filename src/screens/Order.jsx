import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import OrderData from '../data/orders.json'
import OrderItem from '../components/OrderItem'
import Header from '../components/Header'

const Order = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header title={'Orders'} />
            <View style={styles.container}>
                <FlatList
                    data={OrderData}
                    keyExtractor={orderItem => orderItem.id}
                    renderItem={({ item }) => {
                        return (
                            <OrderItem
                                order={item}
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flex: 1,
        margin: 12,
    },
})
