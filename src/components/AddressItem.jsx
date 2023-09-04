import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../global/colors";

/**
 * AddressItem component to display an address and provide an option to change it.
 *
 * @param {object} props - Component props.
 * @param {object} props.location - Address information.
 * @param {string} props.location.address - The address to display.
 * @param {object} props.navigation - Navigation object.
 * @returns {JSX.Element} - AddressItem component.
 */
const AddressItem = ({ location, navigation }) => {
    const onChangeLocation = () => {
        navigation.navigate('Location Selector');
    }

    return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {location.address}
                </Text>
            </View>
            <Pressable onPress={onChangeLocation}>
                <Entypo name="location" size={30} color="black" />
                <Text style={styles.text2}>Change</Text>
            </Pressable>
        </View>
    );
};

export default AddressItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.SECONDARY,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontFamily: "Nunito",
        fontSize: 17,
        color: "black",
    },
    text2: {
        fontFamily: "Nunito",
        fontSize: 19,
        color: colors.TERTIARY,
    },
});
