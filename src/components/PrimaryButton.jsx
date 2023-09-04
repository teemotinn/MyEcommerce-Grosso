import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import ProgressCircle from "../components/ProgressCircle";
import { colors } from "../global/colors";

const PrimaryButton = ({
    containerStyle,
    disabled,
    onPress,
    title,
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
                styles.button,
                disabled && styles.disabledButtonDecoration,
                containerStyle ?? []
            ]}
        >
            {loading &&
                <ProgressCircle size={12} color={colors.FONT} />
            }
            <Animated.Text
                numberOfLines={1}
                style={[
                    styles.title,
                    disabled && styles.disabledTextDecoration,
                    { marginLeft: textMarginLeft },
                ]}
            >
                {title}
            </Animated.Text>
        </TouchableOpacity>
    );
}

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.PRIMARY,
        borderRadius: 100,
        maxWidth: 360,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    title: {
        fontFamily: 'NunitoBold',
        fontSize: 14,
        textAlign: 'center',
        color: colors.FONT,
        flexShrink: 1,
    },
    disabledButtonDecoration: {
        backgroundColor: colors.DISABLED_BACKGROUND,
    },
    disabledTextDecoration: {
        color: colors.DISABLED_FONT,
    },
});
