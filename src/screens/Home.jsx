import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import categories from '../data/categories.json'
import CategoryItem from '../components/CategoryItem'

export default function Home() {
    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={category => category}
                renderItem={({ item }) => CategoryItem({ item })}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 12
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '90%'
    }
})