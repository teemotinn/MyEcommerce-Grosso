import React from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Cart from '../screens/Cart'

const CartStack = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName='Cart'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='CartScreen'
                component={Cart}
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default CartStack

const styles = StyleSheet.create({})