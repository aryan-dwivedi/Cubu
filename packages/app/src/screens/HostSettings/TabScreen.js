import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Earnings from './Earnings';
import Reviews from './Reviews';
import Vehicle from './Vehicle';

const Tab = createMaterialTopTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Vehicle} />
      <Tab.Screen name="Reviews" component={Reviews} />
      <Tab.Screen name="Earnings" component={Earnings} />
    </Tab.Navigator>
  );
};

export default TabScreen;
