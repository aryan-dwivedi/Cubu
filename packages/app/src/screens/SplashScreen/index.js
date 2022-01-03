import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import styles from './styles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('../../../assets/adaptive-icon.png')} style={styles.logo} />
      <View style={styles.bottomContainer} />
    </View>
  );
};

export default SplashScreen;
