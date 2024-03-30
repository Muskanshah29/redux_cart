

import { createSlice } from '@reduxjs/toolkit';
import s1Image from '../images/s1.png'; // Import local images
import s2Image from '../images/s2.png';
import s3Image from '../images/s3.png';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [
      {
        id: '1',
        image: s1Image, // Use imported image
        name: 'Shoes',
        brand: 'adidas',
        price: 10,
        qty: 0,
      },
      {
        id: '2',
        image: s2Image,
        name: 'Shoes',
        brand: 'adidas',
        price: 20,
        qty: 0
      },
      {
        id: '3',
        image: s3Image,
        name: 'Shoes',
        brand: 'adidas',
        price: 30,
        qty: 0
      },
      {
        id: '4',
        image: s1Image, // Use imported image
        name: 'Shoes',
        brand: 'adidas',
        price: 40,
        qty: 0
      },
    ],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const product = state.items.find((item) => item.id === id);
      if (product) {
        product.qty += 1;
      }
    },
    
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product && product.qty > 0) {
        product.qty = 0; // Set quantity to zero
      }
    },
    
    
  },
});

export const { addToCart, removeFromCart } = productsSlice.actions;

export default productsSlice.reducer;
