import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'

import CategoryItem from '../components/CategoryItem'
import Header from '../components/Header'
import { useGetCategoriesQuery } from '../services/shopServices'
import ProgressCircle from '../components/ProgressCircle'
import { ERROR_TITLE, MARGIN } from '../global/constants'
import NotFoundMessage from '../components/NotFoundMessage'
import { colors } from '../global/colors'

export default function Home({
    navigation,
}) {
    const { data: categories, isLoading, isError, refetch } = useGetCategoriesQuery()

    const showResult = () => {
        return (
            isError
                ? <NotFoundMessage
                    title={ERROR_TITLE}
                    icon='alert-circle-outline'
                    message='Try again or contact our support.'
                    buttonText={'Retry'}
                    onButtonPressed={refetch}
                />
                : <View style={{ flex: 1 }}>
                    <Text style={styles.categoryIntro}>
                        We have all these product categories:
                    </Text>
                    <FlatList
                        data={categories}
                        keyExtractor={category => category}
                        renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: MARGIN,
                            paddingTop: 8,
                            paddingBottom: MARGIN
                        }}
                    />
                </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title={'Welcome!'} />
            <View style={styles.container}>
                {isLoading
                    ? <ProgressCircle />
                    : showResult()
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    categoryIntro: {
        fontFamily: 'Nunito',
        fontSize: 14,
        padding: MARGIN,
        backgroundColor: colors.TERTIARY
    }
})