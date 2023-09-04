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
import { colors } from "../global/colors"
import MySnackbar from "../components/MySnackbar"
import NotFoundMessage from "../components/NotFoundMessage"
import { ERROR_TITLE } from "../global/constants"

const ItemDetail = ({
    navigation
}) => {
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)

    const selectedProductId = useSelector(state => state.shopReducer.value.selectedProductId)
    const dispatch = useDispatch()

    const { data, isLoading, isError, refetch } = useGetProductByIdQuery(selectedProductId)

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
        setIsSnackbarVisible(true)
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
                            <Text style={styles.stock}>
                                {data.stock === 0 && 'Out of stock'}
                            </Text>
                        </View>

                    </View>
                    <PrimaryButton
                        disabled={data.stock === 0}
                        title='Add to cart'
                        onPress={onAddCart}
                    />
                </View >
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header goBack={navigation.goBack} />
            {isLoading
                ? <View style={styles.centeredItems}>
                    <ProgressCircle />
                </View>
                : showResult()
            }
            <MySnackbar
                isVisible={isSnackbarVisible}
                message={'Added!'}
                onDismiss={() => setIsSnackbarVisible(false)}
                onPressAction={() => setIsSnackbarVisible(false)}
            />
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
        width: '100%',
        marginBottom: 12
    },
    textContainer: {
        width: '100%',
        marginTop: 8
    },
    titleText: {
        color: colors.FONT,
        fontSize: 24,
        fontFamily: 'NunitoBold'
    },
    descriptionText: {
        color: colors.FONT,
        marginTop: 12,
        fontSize: 16,
        fontFamily: 'Nunito'
    },
    price: {
        color: colors.FONT,
        marginTop: 16,
        fontSize: 24,
        fontFamily: 'NunitoBold'
    },
    stock: {
        color: colors.ALERT_FONT,
        marginTop: 4,
        fontSize: 24,
        fontFamily: 'NunitoBold'
    }
});