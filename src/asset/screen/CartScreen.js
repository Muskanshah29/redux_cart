
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../redux/productsSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.products.items.filter(item => item.qty > 0));

  const renderItem = ({ item }) => {
    const handleRemoveFromCart = () => {
      dispatch(removeFromCart({ id: item.id }));
    };

    const handleAddToCart = () => {
      dispatch(addToCart({ id: item.id }));
    };

    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemBrand}>Brand: {item.brand}</Text>
          <Text style={styles.itemPrice}>Price: ₹{item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={handleRemoveFromCart}>
              <Text style={[styles.quantityButton, styles.green]}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.qty}</Text>
            <TouchableOpacity onPress={handleAddToCart}>
              <Text style={[styles.quantityButton, styles.green]}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => dispatch(removeFromCart({ id: item.id }))} style={styles.deleteButton}>
          <AntDesign name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  itemContainer: {
    width: width * 0.94,
    alignSelf: 'center',
    height: 140,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between', // Align delete button horizontally
    alignItems: 'center', // Center delete button vertically
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  itemBrand: {
    fontWeight: '600',
  },
  itemPrice: {
    color: 'green',
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: 'green',
    borderRadius: 7,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  green: {
    color: '#fff',
  },
});

export default CartScreen;



