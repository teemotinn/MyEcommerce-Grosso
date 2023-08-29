import { Image, StyleSheet, View } from "react-native";
import React from "react";
import AddButton from "../components/AddButton";
import { useGetProfileImageQuery } from "../services/shopServices";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/user/userSlice";
import { deleteSession } from "../SQLite";

const MyProfile = ({ navigation }) => {

    const dispatch = useDispatch();
    const { localId, profileImage } = useSelector(state => state.userReducer.value)

    const { data: image } = useGetProfileImageQuery(localId)

    const cameraImage = image?.image

    const launchCamera = async () => {
        navigation.navigate('Image Selector')
    };

    const launchLocation = async () => {
        navigation.navigate('List Address')
    }

    const onSignout = async () => {
        try {
            console.log("Deleting session...");
            const response = await deleteSession(localId)
            console.log("Session deleted: ")
            console.log(response)
            dispatch(signOut())
        } catch (error) {
            console.log('Error while sign out:')
            console.log(error.message);
        }
    }

    return (
        <View style={styles.container}>
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
            <AddButton onPress={launchCamera} title="Add profile picture" />
            <AddButton onPress={launchLocation} title="My address" />
            <AddButton onPress={onSignout} title="Logout" />
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});