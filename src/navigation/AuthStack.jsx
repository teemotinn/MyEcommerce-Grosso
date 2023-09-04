import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUpScreen from "../screens/SignUp";
import LoginScreen from "../screens/Login";

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Signup"
                component={SignUpScreen}
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_bottom'
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_bottom'
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;