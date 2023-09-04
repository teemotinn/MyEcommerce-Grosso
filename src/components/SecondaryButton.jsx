import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import ProgressCircle from "../components/ProgressCircle";
import { colors } from "../global/colors";

const SecondaryButton = ({
    disabled,
    onPress,
    text,
    loading,
}) => {
    const [textAnimation] = useState(new Animated.Value(0));

    const startTextAnimation = () => {
        Animated.timing(textAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const startReverseTextAnimation = () => {
        Animated.timing(textAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (loading) {
            startTextAnimation();
        } else {
            startReverseTextAnimation();
        }
    }, [loading]);

    const textMarginLeft = textAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
    });

    useEffect(() => {
        return () => {
            textAnimation.setValue(0);
        };
    }, [textAnimation]);

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={() => {
                onPress?.();
            }}
            style={[
                styles.primaryButton,
                disabled && styles.disabledButtonDecoration,
            ]}
        >
            {loading &&
                <ProgressCircle />
            }
            <Animated.Text
                numberOfLines={1}
                style={[
                    styles.primaryButtonText,
                    disabled && styles.disabledTextDecoration,
                    { marginLeft: textMarginLeft },
                ]}
            >
                {text}
            </Animated.Text>
        </TouchableOpacity>
    );
}

export default SecondaryButton;

const styles = StyleSheet.create({
    primaryButton: {
        alignSelf: 'center',
        width: '100%',
        flexDirection: 'row',
        borderColor: colors.PRIMARY,
        borderWidth: 1,
        borderRadius: 100,
        maxWidth: 360,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    primaryButtonText: {
        fontFamily: 'NunitoBold',
        fontSize: 14,
        textAlign: 'center',
        color: colors.FONT,
        flexShrink: 1,
    },
    disabledButtonDecoration: {
        borderRadius: colors.DISABLED_BACKGROUND,
        borderWidth: 1
    },
    disabledTextDecoration: {
        color: colors.DISABLED_FONT,
    },
});