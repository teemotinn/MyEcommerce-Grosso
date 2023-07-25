import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import ProductItem from '../components/ProductItem'
import productsData from '../data/products.json'
import Search from '../components/Search'
import Header from '../components/Header'

const ItemListCategory = ({
    navigation,
    route
}) => {
    const { category } = route.params

    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState("")
    const [keywordError, setKeywordError] = useState("")

    useEffect(() => {
        const productsFiltered = productsData.filter(
            product =>
                product.category === category &&
                product.title.toLowerCase().includes(keyword.toLowerCase())
        )
        setProducts(productsFiltered)

    }, [keyword])

    const onSearch = (input) => {
        const expression = /^[a-zA-Z0-9 ]*$/
        const evaluation = expression.test(input)

        if (evaluation) {
            setKeyword(input)
            setKeywordError("")
        } else {
            setKeywordError("Solo letras y números")
        }
    }

    const onErase = () => {
        setKeyword("")
        setKeywordError("")
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title={'Products'} goBack={navigation.goBack} />
            <View style={styles.container}>
                <Search
                    onSearch={onSearch}
                    onErase={onErase}
                    error={keywordError}
                />
                <FlatList
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
            </View>
        </View>
    )
}

export default ItemListCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})