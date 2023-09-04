import React, { useCallback, useEffect, useState } from "react"
import {
    Image,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import { useDispatch, useSelector } from "react-redux"
import { addCartItem } from "../features/cart/cartSlice"

import { useGetProductByIdQuery } from "../services/shopServices"

import Header from "../components/Header"
import PrimaryButton from "../components/PrimaryButton"
import ProgressCircle from "../components/ProgressCircle"

const ItemDetail = ({
    navigation
}) => {
    const selectedProductId = useSelector(state => state.shopReducer.value.selectedProductId)

    const dispatch = useDispatch()

    const { data, isLoading, refetch } = useGetProductByIdQuery(selectedProductId)

    const loadDataOnFocus = useCallback(() => {
        refetch()
    }, [refetch])

    useFocusEffect(loadDataOnFocus)

    const [orientation, setOrientation] = useState("portrait");
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (width > height) setOrientation("landscape");
        else setOrientation("portrait");
    }, [width, height]);

    const onAddCart = () => {
        dispatch(addCartItem({
            ...data,
            quantity: 1
        }))
    }

    return (
        <View style={{ flex: 1 }}>
            <Header goBack={navigation.goBack} />
            {isLoading
                ? <View style={styles.centeredItems}>
                    <ProgressCircle />
                </View>
                : <View
                    style={
                        orientation === "portrait"
                            ? styles.mainContainer
                            : styles.mainContainerLandscape
                    }
                >
                    <View style={styles.infoContainer}>
                        <Image
                            source={{ uri: data.images[0] }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>{data.title}</Text>
                            <Text style={styles.descriptionText}>{data.description}</Text>
                            <Text style={styles.price}>${data.price}</Text>
                        </View>

                    </View>
                    <PrimaryButton
                        title='Add to cart'
                        onPress={onAddCart}
                    />
                </View>
            }
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
    centeredItems: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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