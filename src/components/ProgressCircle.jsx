import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { colors } from "../global/colors"

export default function ProgressCircle({
  size,
  color
}) {
  return (
    <View style={styles.centeredView}>
      <ActivityIndicator
        size={size ?? 'large'}
        color={color ?? colors.PRIMARY}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center"
  }
})
