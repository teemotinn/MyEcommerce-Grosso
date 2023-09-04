import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { google_maps_api_key } from "../database/firebaseConfig";

/**
 * MapPreview component for displaying a static map image based on location coordinates.
 *
 * @param {object} props - Component props.
 * @param {object} props.location - Location information with latitude and longitude.
 * @returns {JSX.Element} - MapPreview component.
 */
const MapPreview = ({ location }) => {

    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${google_maps_api_key}`;

    return (
        <View style={styles.mapPreview}>
            <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
        </View>
    );
};

export default MapPreview;

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: "center",
        alignItems: "center",
    },
    mapImage: {
        width: 300,
        height: 300,
    },
});
