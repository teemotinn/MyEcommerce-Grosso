import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

import CartData from '../data/cart.json'
import CartItem from '../components/CartItem';
import Header from '../components/Header';

const Cart = () => {
  const total = CartData.reduce((acc, currentItem) => acc += currentItem.price * currentItem.quantity, 0)
    
  return (
    <View style={{ flex: 1 }}>
      <Header title={'Cart'} />
      <View style={styles.container}>
        <FlatList
          data={CartData}
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
          <Pressable>
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