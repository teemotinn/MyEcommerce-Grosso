import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '../global/colors';

/**
 * ProgressCircle component for displaying a loading indicator.
 *
 * @param {object} props - Component props.
 * @param {string | number} [props.size] - Size of the loading indicator (e.g., 'small', 'large', 14).
 * @param {string} [props.color] - Color of the loading indicator.
 * @returns {JSX.Element} - ProgressCircle component.
 */
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
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
