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
            <Stack.Screen
                name="OrderScreen"
                component={Order}
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }}
            />

        </Stack.Navigator>
    );
};

export default OrderStack;