import React, { useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native"
import Modal from "react-native-modal"
import ProgressCircle from "../components/ProgressCircle"
import { colors } from "../global/colors"

type Props = {
  isLoading?: boolean,
  isVisible: boolean,
  title?: string,
  mainButtonText?: string,
  mainButtonDisabled?: boolean,
  onMainButtonPress?: () => void,
  secondaryButtonText?: string,
  onSecondaryButtonPress?: () => void,
  onModalHide?: () => void,
  onModalHideWithMainButton?: () => void,
  onModalHideWithSecondaryButton?: () => void,
  content?: any,
  children?: any
}

export default function MyModal(props: Props) {
  const [isPrimaryButtonPressed, setIsPrimaryButtonPressed] = useState(false);
  const [isSecondaryButtonPressed, setIsSecondaryButtonPressed] = useState(false);

  const onModalHide = () => {
    props?.onModalHide?.()
    if (isPrimaryButtonPressed) {
      setIsPrimaryButtonPressed(false);
      props?.onModalHideWithMainButton?.();
    }
    if (isSecondaryButtonPressed) {
      setIsSecondaryButtonPressed(false);
      props?.onModalHideWithSecondaryButton?.();
    }
  };

  return (
    <Modal
      isVisible={props.isVisible}
      onModalHide={onModalHide}
    >
      <View style={styles.centeredView}>
        {props.isLoading ? (
          <ProgressCircle />
        ) : (
          <View style={styles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.modalTitle}>{props.title ?? ''}</Text>
              <View>{props?.content ?? props.children}</View>
              <View style={styles.buttonsContainer}>
                {(props.mainButtonText || props.onMainButtonPress) &&
                  <TouchableOpacity
                    style={styles.mainButtonStyle}
                    onPress={() => {
                      if (props?.mainButtonDisabled ?? true) {
                        setIsSecondaryButtonPressed(false);
                        setIsPrimaryButtonPressed(true);
                        props.onMainButtonPress?.();
                      }
                    }}
                  >
                    <Text numberOfLines={1} style={styles.mainButtonText}>
                      {props.mainButtonText ?? 'Ok'}
                    </Text>
                  </TouchableOpacity>
                }
                {props.secondaryButtonText &&
                  <TouchableOpacity
                    style={styles.secondaryButtonStyle}
                    onPress={() => {
                      setIsPrimaryButtonPressed(false);
                      setIsSecondaryButtonPressed(true);
                      props.onSecondaryButtonPress?.();
                    }}
                  >
                    <Text numberOfLines={1} style={styles.secondaryButtonText}>
                      {props.secondaryButtonText}
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  )
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
    padding: 24
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
})