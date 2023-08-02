import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

import CartItem from '../components/CartItem';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { usePostCartMutation } from '../services/shopServices';

const Cart = () => {
  const { items: cartData, total, updatedAt, user } = useSelector(state => state.cartReducer.value)
  const [triggerPostCart, result] = usePostCartMutation()

  const onConfirm = () => {
    triggerPostCart({ cartData, total, user, updatedAt })
  }
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