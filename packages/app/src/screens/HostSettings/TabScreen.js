import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Vehicle from './Vehicle';
import Earnings from './Earnings';
import Reviews from './Reviews';

const Tab = createMaterialTopTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Vehicle} />
      <Tab.Screen name="Reviews" component={Reviews} />
      <Tab.Screen name="Earnings" component={Earnings} />
    </Tab.Navigator>
  )
}

export default TabScreen
