import { StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import React from 'react'
import ItemListCategory from '../screens/ItemListCategory'
import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { colors } from '../global/colors'
import ItemDetail from '../screens/ItemDetail'

export default function Navigator() {
    const Stack = createNativeStackNavigator()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" translucent />
            <NavigationContainer>
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
            </NavigationContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
})