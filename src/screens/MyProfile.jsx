import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopServices";
import { useDispatch } from "react-redux";
import { signOut } from "../features/user/userSlice";
import { deleteSession } from "../SQLite";
import Header from "../components/Header";
import SecondaryButton from "../components/SecondaryButton";
import { MARGIN } from "../global/constants";
import { FontAwesome } from "@expo/vector-icons"; // Importa el componente FontAwesome

const MyProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { localId, profileImage, email } = useSelector(
        (state) => state.userReducer.value
    );

    const { data: image } = useGetProfileImageQuery(localId);

    const cameraImage = image?.image;

    const launchCamera = async () => {
        navigation.navigate("Image Selector");
    };

    const launchLocation = async () => {
        navigation.navigate("List Address");
    };

    const onSignout = async () => {
        try {
            const response = await deleteSession(localId);
            dispatch(signOut());
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title={"My Profile"} />
            <View style={styles.container}>
                <View style={styles.centeredItems}>
                    <TouchableOpacity onPress={launchCamera}>
                        <View>
                            {profileImage || cameraImage ? (
                                <Image
                                    source={{ uri: profileImage || cameraImage }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image
                                    source={require("../assets/images/defaultProfile.png")}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            )}
                            <View style={styles.cameraIcon}>
                                <FontAwesome name="camera" size={20} color="#fff" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.userInfo}>{email}</Text>
                </View>
                <SecondaryButton onPress={onSignout} title="Logout" />
            </View>
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: MARGIN,
        gap: 15,
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 12,
    },
    centeredItems: {
        justifyContent: "center",
        alignItems: "center",
    },
    userInfo: {
        fontFamily: "NunitoBold",
        fontSize: 20,
    },
    cameraIcon: {
        position: "absolute",
        bottom: 12,
        right: 12,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 100,
        padding: 8,
        zIndex: 1,
    },
});
