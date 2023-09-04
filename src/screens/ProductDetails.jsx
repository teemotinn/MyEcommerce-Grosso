import React, { useEffect, useState } from "react"
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native"

import allProducts from "../data/products.json"
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { addCartItem } from "../features/cart/cartSlice"
import PrimaryButton from "../components/PrimaryButton"

const ItemDetail = ({
    navigation,
    route
}) => {
    const selectedProductId = useSelector(state => state.shopReducer.value.selectedProductId)

    const dispatch = useDispatch()

    const [product, setProduct] = useState(null);
    const [orientation, setOrientation] = useState("portrait");
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (width > height) setOrientation("landscape");
        else setOrientation("portrait");
    }, [width, height]);

    useEffect(() => {
        const productSelected = allProducts.find(
            (product) => product.id === selectedProductId
        );
        setProduct(productSelected);
    }, [selectedProductId]);

    const onAddCart = () => {
        dispatch(addCartItem({
            ...product,
            quantity: 1
        }))
    }

    return (
        <View style={{ flex: 1 }}>
            <Header goBack={navigation.goBack} />
            {product ? (
                <View
                    style={
                        orientation === "portrait"
                            ? styles.mainContainer
                            : styles.mainContainerLandscape
                    }
                >
                    <View style={styles.infoContainer}>
                        <Image
                            source={{ uri: product.images[0] }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>{product.title}</Text>
                            <Text style={styles.descriptionText}>{product.description}</Text>
                            <Text style={styles.price}>${product.price}</Text>
                        </View>

                    </View>
                    <PrimaryButton
                        title='Add cart'
                        onPress={onAddCart}
                    />
                </View>
            ) : null}
        </View>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 16,
    },
    mainContainerLandscape: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 16,
    },
    image: {
        width: 300,
        height: 250,
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    textContainer: {
        width: '100%',
        marginTop: 8
    },
    titleText: {
        fontSize: 24,
        fontFamily: 'NunitoBold'
    },
    descriptionText: {
        marginTop: 12,
        fontSize: 16,
        fontFamily: 'Nunito'
    },
    price: {
        marginTop: 16,
        fontSize: 24,
        fontFamily: 'NunitoBold'
    }
});