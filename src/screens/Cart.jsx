import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import CartItem from '../components/CartItem'
import Header from '../components/Header'

import { usePostCartMutation } from '../services/shopServices'
import { resetCart } from "../features/cart/cartSlice"

import NotFoundMessage from '../components/NotFoundMessage'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'
import MyModal from '../components/MyModal'
import ModalMessage from '../components/ModalMessage'
import { useState } from 'react'
import { MARGIN } from '../global/constants'

const Cart = ({
  navigation
}) => {
  const [isDoneModalVisible, setIsDoneModalVisible] = useState(false)
  const { items: cartData, total, updatedAt } = useSelector(state => state.cartReducer.value)
  const dispatch = useDispatch()
  const { localId } = useSelector(state => state.userReducer.value)
  const [triggerPostCart, { isSuccess, isLoading }] = usePostCartMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetCart())
      setIsDoneModalVisible(true)
    }
  }, [isSuccess])

  const onConfirm = () => {
    triggerPostCart({ cartData, total, localId, updatedAt })
  }

  onClear = () => {
    dispatch(resetCart())
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={'Cart'} />
      <View style={styles.container}>
        {cartData.length !== 0
          ? <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            data={cartData}
            keyExtractor={cartItem => cartItem.id}
            renderItem={({ item }) => {
              return (
                <CartItem
                  cartItem={item}
                />
              )
            }}
          />
          :
          <NotFoundMessage
            title={'Start a shopping cart!'}
            message={'Add products, we are here to send them to you.'}
            onButtonPressed={() => navigation.navigate('ItemListCategory')}
            buttonText={'Go shopping'}
          />

        }
        {cartData.length !== 0 &&
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: ${total}
            </Text>
            <PrimaryButton
              loading={isLoading}
              title={'Confirm'}
              onPress={onConfirm}
              containerStyle={styles.primaryButton}
            />
            <SecondaryButton
              disabled={isLoading}
              title={'Clear'}
              onPress={onClear}
            />
          </View>
        }
      </View>
      <MyModal
        isVisible={isDoneModalVisible}
        title='Done!'
        onMainButtonPress={() => setIsDoneModalVisible(false)}
      >
        <ModalMessage>
          We made the order for your cart.
        </ModalMessage>
      </MyModal>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1
  },
  list: {
    padding: MARGIN
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: MARGIN
  },
  totalText: {
    fontFamily: 'NunitoBold',
    fontSize: 18,
    marginBottom: 8
  },
  primaryButton: {
    marginBottom: 12
  }
})