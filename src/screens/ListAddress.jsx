import { StyleSheet, Text, View } from "react-native"
import React from "react";
import { useSelector } from "react-redux"
import AddButton from "../components/AddButton"
import AddressItem from '../components/AddressItem'

const ListAddress = ({ navigation }) => {
    const { location } = useSelector((state) => state.userReducer.value);

    return location.latitude ? (
        <AddressItem location={location} navigation={navigation} />
    ) : (
        <View style={styles.container}>
            <Text style={styles.text}>No location set</Text>
            <AddButton
                title="Set location"
                onPress={() => navigation.navigate("Location Selector")}
            />
        </View>
    );
};

export default ListAddress;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        paddingVertical: 20,
        fontFamily: 'Nunito',
        fontSize: 18
    }
});