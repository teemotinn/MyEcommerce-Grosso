import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import CategoryItem from '../components/CategoryItem'
import Header from '../components/Header'
import { useGetCategoriesQuery } from '../services/shopServices'
import ProgressCircle from '../components/ProgressCircle'

export default function Home({
    navigation,
}) {
    const { data: categories, isLoading, isError } = useGetCategoriesQuery()

    return (
        <View style={{ flex: 1 }}>
            <Header title={'Home'} />
            <View style={styles.container}>
                {isLoading
                    ? <ProgressCircle />
                    : <FlatList
                        data={categories}
                        keyExtractor={category => category}
                        renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 12
                        }}
                    />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})