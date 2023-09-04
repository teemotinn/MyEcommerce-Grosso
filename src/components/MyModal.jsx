import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import ProgressCircle from "./ProgressCircle";
import { colors } from "../global/colors";

/**
 * MyModal component for displaying a customizable modal.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isLoading - Flag to indicate if the modal is in loading state.
 * @param {boolean} props.isVisible - Flag to control the visibility of the modal.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.mainButtonText - The text for the main button.
 * @param {function} props.onMainButtonPress - Callback function for the main button press.
 * @param {string} props.secondaryButtonText - The text for the secondary button.
 * @param {function} props.onSecondaryButtonPress - Callback function for the secondary button press.
 * @param {function} props.onModalHide - Callback function triggered when the modal is hidden.
 * @param {function} props.onModalHideWithMainButton - Callback function triggered when the modal is hidden with the main button.
 * @param {function} props.onModalHideWithSecondaryButton - Callback function triggered when the modal is hidden with the secondary button.
 * @param {JSX.Element} props.children - Content to display within the modal.
 * @returns {JSX.Element} - MyModal component.
 */
export default function MyModal({
  isLoading,
  isVisible,
  title,
  mainButtonText,
  onMainButtonPress,
  secondaryButtonText,
  onSecondaryButtonPress,
  onModalHide,
  onModalHideWithMainButton,
  onModalHideWithSecondaryButton,
  children
}) {

  const [isPrimaryButtonPressed, setIsPrimaryButtonPressed] = useState(false);
  const [isSecondaryButtonPressed, setIsSecondaryButtonPressed] = useState(false);

  const onModalHideProps = () => {
    onModalHide?.();
    if (isPrimaryButtonPressed) {
      setIsPrimaryButtonPressed(false);
      onModalHideWithMainButton?.();
    }
    if (isSecondaryButtonPressed) {
      setIsSecondaryButtonPressed(false);
      onModalHideWithSecondaryButton?.();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onModalHide={onModalHideProps}
    >
      <View style={styles.centeredView}>
        {isLoading ? (
          <ProgressCircle />
        ) : (
          <View style={styles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
              <Text style={styles.modalTitle}>{title ?? ''}</Text>
              <View>{children}</View>
              <View style={styles.buttonsContainer}>
                {(mainButtonText || onMainButtonPress) &&
                  <TouchableOpacity
                    style={styles.mainButtonStyle}
                    onPress={() => {
                      setIsSecondaryButtonPressed(false);
                      setIsPrimaryButtonPressed(true);
                      onMainButtonPress?.();
                    }}
                  >
                    <Text numberOfLines={1} style={styles.mainButtonText}>
                      {mainButtonText ?? 'Ok'}
                    </Text>
                  </TouchableOpacity>
                }
                {secondaryButtonText &&
                  <TouchableOpacity
                    style={styles.secondaryButtonStyle}
                    onPress={() => {
                      setIsPrimaryButtonPressed(false);
                      setIsSecondaryButtonPressed(true);
                      onSecondaryButtonPress?.();
                    }}
                  >
                    <Text numberOfLines={1} style={styles.secondaryButtonText}>
                      {secondaryButtonText}
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: colors.BACKGROUND,
    borderRadius: 20,
    alignItems: "center",
  },
  scrollContainer: {
    padding: 24,
    width: '100%',
  },
  modalTitle: {
    textAlign: 'center',
    color: colors.FONT,
    marginBottom: 16,
    fontSize: 24,
    fontFamily: 'NunitoBold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonsContainer: {
    marginTop: 32,
    alignItems: 'center',
    width: '100%'
  },
  mainButtonStyle: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 100,
    padding: 12,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%'
  },
  mainButtonText: {
    fontSize: 14,
    fontFamily: 'NunitoBold',
    color: colors.FONT,
  },
  secondaryButtonStyle: {
    borderRadius: 100,
    borderColor: colors.BUTTON_BORDER,
    borderWidth: 1,
    padding: 11,
    marginTop: 8,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%'
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'NunitoBold',
    color: colors.FONT,
  }
});
