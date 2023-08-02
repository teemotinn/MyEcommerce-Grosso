import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignupScreen from "../screens/SignUp";
import LoginScreen from "../screens/Login";

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Signup"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;