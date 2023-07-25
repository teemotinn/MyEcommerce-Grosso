import React from 'react'
import { StyleSheet } from 'react-native'
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
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name='ProductDetail'
                component={ItemDetail}
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default ShopStack

const styles = StyleSheet.create({})