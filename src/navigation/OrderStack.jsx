import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Order from "../screens/Order";

const Stack = createNativeStackNavigator()

const OrderStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="OrderScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="OrderScreen" component={Order} />

        </Stack.Navigator>
    );
};

export default OrderStack;