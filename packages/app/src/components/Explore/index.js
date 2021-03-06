import React from 'react';
import { ImageBackground, Pressable, SafeAreaView, Text, View } from 'react-native';
import styles from './styles';

const Explore = props => {
  const explore = props.explore;
  return (
    <SafeAreaView>
      <Pressable style={styles.container}>
        <View style={styles.innerContainer}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: explore.image
            }}
          >
            <Text style={styles.text}>{explore.name}</Text>
          </ImageBackground>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Explore;
