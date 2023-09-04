import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MyProfile from "../screens/MyProfile"
import ImageSelector from "../screens/ImageSelector"

const Stack = createNativeStackNavigator()

const MyProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="My Profile"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="My Profile"
                component={MyProfile}
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }}
            />
            <Stack.Screen
                name="Image Selector"
                component={ImageSelector}
                options={{
                    presentation: 'modal',
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    );
};

export default MyProfileStack;