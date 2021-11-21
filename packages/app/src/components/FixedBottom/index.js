import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const FixedBottom = ({ children }) => {
  return <View style={styles.container}>{children && React.cloneElement(children, { style: styles.btn })}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    padding: 20,
    marginTop: Dimensions.get('window').height / 1.3,
    marginLeft: Dimensions.get('window').width / 5
  },
  btn: {
    height: '100%',
    justifyContent: 'center'
  }
});

export default FixedBottom;
