import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ItemListCategory from '../screens/ItemListCategory'
import Home from '../screens/Home'
import ItemDetail from '../screens/ItemDetail'

const ShopStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Home'
                component={Home}
            />
            <Stack.Screen
                name='ItemListCategory'
                component={ItemListCategory}
            />
            <Stack.Screen
                name='ProductDetail'
                component={ItemDetail}
            />
        </Stack.Navigator>
    )
}

export default ShopStack

const styles = StyleSheet.create({})