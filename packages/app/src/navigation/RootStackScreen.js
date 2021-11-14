import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignIn Screen" component={SignInScreen} />
    <RootStack.Screen name="SignUp Screen" component={SignUpScreen} />
    <RootStack.Screen
      name="Forgot Password Screen"
      component={ForgotPasswordScreen}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
