import React from "react"
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import { colors } from '../global/colors'

export default function NotFoundMessage({
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
        name={"file-tray"}
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
    fontFamily: 'NunitoBold'
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
})
