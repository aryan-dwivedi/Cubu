/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommingSoon from '../screens/CommingSoon';
import DestinationSearchScreen from '../screens/DestinationSearch';
import TabScreen from '../screens/HostSettings/TabScreen';
import HowItWorks from '../screens/HowItWorks';
import NewPost from '../screens/NewPost';
import PostScreen from '../screens/PostScreen';
import SearchResultsScreen from '../screens/SearchResults';
import SearchResultsMap from '../screens/SearchResultsMap';
import { AuthContext } from './Context';
import HomeTabNavigator from './HomeTabNavigatior';
import RootStackScreen from './RootStackScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  const initialLoginState = {
    userToken: null,
    isLoading: true
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
          isLoading: false
        };
    }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: async user => {
        const userToken = String(user.sessionId);
        try {
          await SecureStore.setItemAsync('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGIN', token: userToken });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      }
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView source={require('../../assets/53192-car-animated.json')} autoPlay loop />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator>
            <Stack.Screen
              name={'Home'}
              component={HomeTabNavigator}
              options={{
                headerShown: false
              }}
            />

            <Stack.Screen
              name={'Destination Search'}
              component={DestinationSearchScreen}
              options={{
                title: 'Search your destination',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="keyboard-backspace" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />

            <Stack.Screen
              name={'Search Result'}
              component={SearchResultsScreen}
              options={{
                title: 'Select your car',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="keyboard-backspace" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />

            <Stack.Screen
              name={'Search Result Map'}
              component={SearchResultsMap}
              options={{
                title: 'Select your car',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="keyboard-backspace" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />

            <Stack.Screen
              name={'Post'}
              component={PostScreen}
              options={{
                title: 'Select your car',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="keyboard-backspace" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />

            <Stack.Screen
              name={'New Post'}
              component={NewPost}
              options={{
                title: '',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="close" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />

            <Stack.Screen
              name={'HowItWorks'}
              component={HowItWorks}
              options={{
                title: 'How it works?',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="keyboard-backspace" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />

            <Stack.Screen
              name={'Comming Soon'}
              component={CommingSoon}
              options={{
                title: 'Experiances',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="keyboard-backspace" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />

            <Stack.Screen
              name={'Host Settings'}
              component={TabScreen}
              options={{
                title: 'Settings',
                headerBackTitle: '',
                headerTruncatedBackTitle: '',
                headerBackImage: () => (
                  <View>
                    <MaterialIcons name="keyboard-backspace" size={30} style={{ marginLeft: 10 }} color={'#282C35'} />
                  </View>
                )
              }}
            />
          </Stack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Navigator;
