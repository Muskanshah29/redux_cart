

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from '../store';
import MyProduct from '../MyProduct';
import CartScreen from '../CartScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MyProduct" component={MyProduct} options={{ title: 'Redux-Toolkit' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppNavigation;
