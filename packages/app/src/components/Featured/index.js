/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import styles from './styles';

const Featured = props => {
  const experiances = props.experiances;
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.navigate('Comming Soon')} style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={{
              uri: experiances.image
            }}
          />
          <View style={{ flex: 1, marginVertical: 8 }}>
            <Text style={styles.text}>{experiances.name}</Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Featured;
