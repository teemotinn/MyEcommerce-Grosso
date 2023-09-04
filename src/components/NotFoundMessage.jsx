import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../global/colors';

/**
 * NotFoundMessage component for displaying a message when content is not found.
 *
 * @param {object} props - Component props.
 * @param {string} props.icon - The icon of the message.
 * @param {string} props.title - The title of the message.
 * @param {string} props.message - The message to display.
 * @param {string} props.buttonText - The text for the action button.
 * @param {function} props.onButtonPressed - Callback function for the action button press.
 * @returns {JSX.Element} - NotFoundMessage component.
 */
export default function NotFoundMessage({
  icon,
  title,
  message,
  buttonText,
  onButtonPressed,
}) {
  return (
    <View
      style={styles.container}
    >
      <Icon
        size={70}
        name={icon ?? "file-cabinet"}
        style={styles.icon}
      />
      {title &&
        <Text
          style={styles.title}
        >
          {title}
        </Text>
      }
      {message &&
        <Text
          style={styles.message}>
          {message}
        </Text>
      }
      {
        buttonText && onButtonPressed &&
        <TouchableOpacity
          onPress={() => onButtonPressed()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 24
  },
  icon: {
    color: colors.FONT,
    marginBottom: 12
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: colors.FONT,
    fontSize: 24,
    fontFamily: 'NunitoBold'
  },
  message: {
    textAlign: 'center',
    flexShrink: 1,
    color: colors.FONT,
    fontSize: 14,
    fontFamily: 'Nunito'
  },
  button: {
    marginVertical: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderColor: colors.BUTTON_BORDER
  },
  buttonText: {
    color: colors.FONT,
    fontSize: 14,
    fontFamily: 'NunitoBold'
  }
});
