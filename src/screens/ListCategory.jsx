import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'

import ProductItem from '../components/ProductItem'
import Search from '../components/Search'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopServices'
import ProgressCircle from '../components/ProgressCircle'
import NotFoundMessage from '../components/NotFoundMessage'
import { ERROR_TITLE } from '../global/constants'

const ItemListCategory = ({
    navigation,
}) => {
    const categorySelected = useSelector(state => state.shopReducer.value.categorySelected)
    const { data: productsSelected, isLoading, isError, refetch } = useGetProductsByCategoryQuery(categorySelected)

    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState("")
    const [keywordError, setKeywordError] = useState("")

    useEffect(() => {
        if (productsSelected) {
            const productsFiltered = productsSelected.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLowerCase()))
            setProducts(productsFiltered)
        }

    }, [productsSelected, keyword])

    const onSearch = (input) => {
        const expression = /^[a-zA-Z0-9 ]*$/
        const evaluation = expression.test(input)

        if (evaluation) {
            setKeyword(input)
            setKeywordError("")
        } else {
            setKeywordError("Only letters and numbers.")
        }
    }

    const onErase = () => {
        setKeyword("")
        setKeywordError("")
    }

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
                : <View>
                    <Search
                        onSearch={onSearch}
                        onErase={onErase}
                        error={keywordError}
                    />
                    {
                        products.length === 0
                            ? <NotFoundMessage
                                title='No products were found'
                                icon='magnify'
                            />
                            : <FlatList
                                data={products}
                                keyExtractor={product => product.id}
                                renderItem={({ item }) => <ProductItem item={item} navigation={navigation} />}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 12
                                }}
                            />
                    }
                </View >
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title={'Products'} goBack={navigation.goBack} />
            <View style={styles.container}>
                {isLoading
                    ? <ProgressCircle />
                    : showResult()
                }
            </View>
        </View>
    )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})