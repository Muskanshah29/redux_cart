

import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/productsSlice';
import { useNavigation } from '@react-navigation/native';

const MyProduct = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [showBottomView, setShowBottomView] = useState(false);

  
  const totalCartQuantity = products.reduce((total, product) => {
    if (product.qty > 0) {
      return total + 1;
    }
    return total;
  }, 0);

  // Calculate total price of carted products
  const totalPrice = products.reduce((total, product) => total + (product.qty * product.price), 0);

  // Function to handle adding an item to the cart
  const handleAddToCart = (item) => {
    dispatch(addToCart({ id: item.id }));
    setShowBottomView(true);
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  width: '94%',
                  alignSelf: 'center',
                  height: 140,
                  backgroundColor: '#fff',
                  marginTop: 10,
                  borderRadius: 10,
                  elevation: 1,
                  flexDirection: 'row',
                  paddingLeft: 10,
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: 100,
                    height: 120,
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                />
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 16, color: '#000', fontWeight: '600' }}>
                    {item.name.substring(0, 20) + '..'}
                  </Text>
                  <Text style={{ fontWeight: '600' }}>{item.brand}</Text>
                  <Text style={{ color: 'green', fontWeight: '600' }}>{"₹" + item.price}</Text>
                  {item.qty > 0 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <TouchableOpacity
                        onPress={() => handleRemoveFromCart(item)}
                        style={{
                          backgroundColor: 'green',
                          borderRadius: 7,
                          height: 27,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}>
                        <Text style={{ color: '#fff' }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '600' }}>{item.qty}</Text>
                      <TouchableOpacity
                        onPress={() => handleAddToCart(item)}
                        style={{
                          backgroundColor: 'green',
                          borderRadius: 7,
                          height: 27,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingLeft: 10,
                          paddingRight: 10,
                          marginLeft: 10,
                        }}>
                        <Text style={{ color: '#fff' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleAddToCart(item)}
                      style={{
                        backgroundColor: 'green',
                        borderRadius: 7,
                        height: 27,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 5,
                      }}>
                      <Text style={{ color: '#fff' }}>Add To Cart</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
      {/* Bottom view */}
      {showBottomView && (
        <View style={styles.bottomView}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.cartText}>Add to Cart({totalCartQuantity}) </Text>
            <Text style={styles.cartText}>{"₹" + totalPrice}</Text>
          </View>
          <TouchableOpacity style={styles.viewCartButton} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.viewCartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 25,
  },
  cartText: {
    fontWeight: '600',
  },
  viewCartButton: {
    backgroundColor: 'green',
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewCartButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default MyProduct;
