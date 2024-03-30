// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import MyProduct from './src/asset/screen/MyProduct'


// const App = () => {
//   return (
//     <View>
//       <MyProduct />
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})

import { Provider } from 'react-redux';
import { store } from './src/asset/screen/store';
import React from 'react';
import AppNavigation from './src/asset/screen/Navigation/AppNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
