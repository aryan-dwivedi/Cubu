import React from 'react';
import { View } from 'react-native';
import NoResults from '../../components/Saved/NoResults';
import styles from './styles';

const Saved = () => {
  return (
    <View style={styles.wrapper}>
      <NoResults />
    </View>
  );
};

export default Saved;
