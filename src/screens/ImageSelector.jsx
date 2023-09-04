import React, { useState } from "react";
import { Image, View, StyleSheet, Text, Alert, Linking } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { usePostProfileImageMutation } from "../services/shopServices";

import { useDispatch, useSelector } from "react-redux";
import { saveImage } from "../features/user/userSlice";

import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { MARGIN } from "../global/constants";
import Header from "../components/Header";

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);

    const [triggerSaveImage, resultSaveImage] = usePostProfileImageMutation();
    const dispatch = useDispatch();
    const { localId } = useSelector((state) => state.userReducer.value);

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
    };

    const pickImage = async () => {

        const isCameraOk = await verifyCameraPermissions();

        if (isCameraOk) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }
        else {
            Alert.alert(
                'Camera Permission Required',
                'Camera permission is required to continue.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Go to Settings',
                        onPress: () => {
                            Linking.openSettings()
                        },
                    },
                ],
                { cancelable: false }
            );
        }

    };

    const confirmImage = async () => {
        try {

            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                console.log("Only valid on emulators and physical devices");

                const response = await MediaLibrary.createAssetAsync(image);

                triggerSaveImage({
                    image: response.uri,
                    localId: localId,
                });

                dispatch(saveImage(response.uri));
            }
        } catch (error) {
            console.log(error);
        }
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <Header goBack={navigation.goBack} />
            <View style={styles.container}>
                {image ? (
                    <>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={styles.buttonsContainer}>
                            <SecondaryButton title="Take another photo" onPress={pickImage} />
                            <PrimaryButton containerStyle={styles.primaryButton} title="Confirm photo" onPress={confirmImage} />
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.noPhotoContainer}>
                            <Text style={styles.noPhotoText}>No photo to show...</Text>
                        </View>
                        <PrimaryButton title="Take a photo" onPress={pickImage} />
                    </>
                )}
            </View>
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        padding: MARGIN
    },
    image: {
        width: 240,
        height: 240,
        borderRadius: 500,
    },
    noPhotoContainer: {
        width: 240,
        height: 240,
        borderRadius: 500,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    noPhotoText: {
        fontFamily: 'Nunito'
    },
    primaryButton: {
        marginTop: 12
    },
    buttonsContainer: {
        width: '100%'
    }
});