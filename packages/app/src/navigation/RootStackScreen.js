import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EntranceScreen from '../screens/EntranceScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <RootStack.Screen name="EntranceScreen" component={EntranceScreen} />
    <RootStack.Screen name="SignIn Screen" component={SignInScreen} />
    <RootStack.Screen name="SignUp Screen" component={SignUpScreen} />
    <RootStack.Screen name="Forgot Password Screen" component={ForgotPasswordScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
