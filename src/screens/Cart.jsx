import React, { useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import CartItem from '../components/CartItem'
import Header from '../components/Header'

import { usePostCartMutation } from '../services/shopServices'
import { resetCart } from "../features/cart/cartSlice"

const Cart = () => {
  const { items: cartData, total, updatedAt } = useSelector(state => state.cartReducer.value)
  const dispatch = useDispatch();
  const { localId: userId } = useSelector(state => state.userReducer.value)
  const [triggerPostCart, result] = usePostCartMutation()

  useEffect(() => {
    console.log(result.isSuccess)
    result.isSuccess && dispatch(resetCart())
  }, [result.isSuccess])


  const onConfirm = () => {
    triggerPostCart({ cartData, total, userId, updatedAt })
  }

  console.log(result);

  return (
    <View style={{ flex: 1 }}>
      <Header title={'Cart'} />
      <View style={styles.container}>
        <FlatList
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
        <View style={styles.totalContainer}>
          <Pressable
            onPress={onConfirm}
          >
            <Text>
              Confirm
            </Text>
          </Pressable>
          <Text>Total: ${total}</Text>
        </View>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    margin: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})