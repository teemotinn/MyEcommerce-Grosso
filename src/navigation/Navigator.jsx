import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { colors } from '../global/colors'
import ShopStack from './ShopStack'
import CartStack from './CartStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

export default function Navigator() {
    const Tab = createBottomTabNavigator()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" translucent />
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel:false,
                        tabBarStyle: styles.tabBar
                    }}
                >
                    <Tab.Screen
                        name='Shop'
                        component={ShopStack}
                    />
                    <Tab.Screen
                        name='Cart'
                        component={CartStack}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    tabBar:{
        backgroundColor: colors.PRIMARY,
        shadowColor:'black',
        elevation:4,
        position:'absolute',
        bottom:25,
        right:20,
        left:20,
        borderRadius:15,
        height:90
    }
})