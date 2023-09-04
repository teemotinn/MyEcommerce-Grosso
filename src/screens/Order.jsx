import React, { useCallback } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { useSelector } from "react-redux"

import { useGetOrdersQuery } from "../services/shopServices"

import OrderItem from '../components/OrderItem'
import Header from '../components/Header'
import ProgressCircle from '../components/ProgressCircle'
import NotFoundMessage from '../components/NotFoundMessage'
import { ERROR_TITLE, MARGIN } from '../global/constants'

const Order = ({
    navigation
}) => {
    const { localId } = useSelector(state => state.userReducer.value)
    const { data: orders, refetch, isLoading, isError } = useGetOrdersQuery(localId)

    const loadDataOnFocus = useCallback(() => {
        refetch()
    }, [refetch])

    useFocusEffect(loadDataOnFocus)

    const showResult = () => {
        return (
            orders.length !== 0
                ? <FlatList
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                    }
                    data={orders}
                    contentContainerStyle={styles.list}
                    keyExtractor={orderItem => orderItem.updatedAt}
                    renderItem={({ item }) => {
                        return (
                            <OrderItem
                                order={item}
                            />
                        )
                    }}
                />
                : <NotFoundMessage
                    title={'Empty orders!'}
                    buttonText={'Go to cart'}
                    message={'Confirm a cart and it will become an order that you will see here.'}
                    onButtonPressed={() => navigation.navigate('Cart')}
                />
        )
    }

    const showContent = () => {
        return (
            isError
                ? <NotFoundMessage
                    title={ERROR_TITLE}
                    buttonText={'Retry'}
                    onButtonPressed={refetch}
                />
                : showResult()
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title={'Orders'} />
            <View style={styles.container}>
                {isLoading
                    ? <ProgressCircle />
                    : showContent()

                }
            </View>
        </View>
    )
}

export default Order

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    list: {
        padding: MARGIN
    }
})
