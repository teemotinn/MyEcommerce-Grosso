import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import ProgressCircle from '../components/ProgressCircle';
import { colors } from '../global/colors';

/**
 * SecondaryButton component for rendering a secondary action button.
 *
 * @param {object} props - Component props.
 * @param {object} props.containerStyle - Additional styles for the button container.
 * @param {boolean} props.disabled - Indicates whether the button is disabled.
 * @param {function} props.onPress - Function to execute when the button is pressed.
 * @param {string} props.title - Button title text.
 * @param {boolean} props.loading - Indicates whether the button is in a loading state.
 * @returns {JSX.Element} - SecondaryButton component.
 */
const SecondaryButton = ({
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
                containerStyle ?? [],
            ]}
        >
            {loading && <ProgressCircle size={12} color={colors.FONT} />}
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
};

export default SecondaryButton;

const styles = StyleSheet.create({
    button: {
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
    title: {
        fontFamily: 'NunitoBold',
        fontSize: 14,
        textAlign: 'center',
        color: colors.FONT,
        flexShrink: 1,
    },
    disabledButtonDecoration: {
        borderRadius: colors.DISABLED_BACKGROUND,
        borderWidth: 1,
    },
    disabledTextDecoration: {
        color: colors.DISABLED_FONT,
    },
});
