import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import categories from '../data/categories.json'
import CategoryItem from '../components/CategoryItem'
import Header from '../components/Header'

export default function Home({
    navigation,
}) {
    return (
        <View style={{ flex: 1 }}>
            <Header title={'Home'}/>
            <View style={styles.container}>
                <FlatList
                    data={categories}
                    keyExtractor={category => category}
                    renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 12
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})