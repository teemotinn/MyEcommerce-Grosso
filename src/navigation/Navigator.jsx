import React from 'react'
import { StyleSheet, SafeAreaView, Platform, StatusBar, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ShopStack from './ShopStack'
import CartStack from './CartStack'
import OrderStack from './OrderStack'
import AuthStack from './AuthStack'
import MyProfileStack from './MyProfileStack'

import { colors } from '../global/colors'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

export default function Navigator() {

    const { email } = useSelector(state => state.userReducer.value)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" translucent />
            <NavigationContainer>
                {email
                    ? <Tab.Navigator
                        screenOptions={{
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarStyle: styles.tabBar
                        }}
                    >
                        <Tab.Screen
                            name='Shop'
                            component={ShopStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View>
                                            <MaterialCommunityIcons name="store" size={24} color={focused ? 'black' : colors.SECONDARY} />
                                        </View>
                                    )
                                }
                            }}
                        />
                        <Tab.Screen
                            name='Cart'
                            component={CartStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View>
                                            <MaterialCommunityIcons name="cart" size={24} color={focused ? 'black' : colors.SECONDARY} />
                                        </View>
                                    )
                                }
                            }}
                        />
                        <Tab.Screen
                            name='Orders'
                            component={OrderStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View>
                                            <MaterialCommunityIcons name="format-list-bulleted" size={24} color={focused ? 'black' : colors.SECONDARY} />
                                        </View>
                                    )
                                }
                            }}
                        />
                        <Tab.Screen
                            name="MyProfile"
                            component={MyProfileStack}
                            options={{
                                tabBarIcon: ({ focused }) => {
                                    return (
                                        <View style={styles.item}>
                                            <MaterialCommunityIcons
                                                name="account"
                                                size={24}
                                                color={focused ? 'black' : colors.SECONDARY}
                                            />
                                        </View>
                                    );
                                },
                            }}
                        />
                    </Tab.Navigator>
                    : <AuthStack />
                }

            </NavigationContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    tabBar: {
        backgroundColor: colors.PRIMARY,
        shadowColor: 'black',
        elevation: 4,
        height: '10%'
    }
})