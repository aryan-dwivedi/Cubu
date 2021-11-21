import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import feed from '../../../assets/data/feed';

const user = feed[0];

const Listings = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate('Host Settings')}>
      <Image
        style={styles.image}
        source={{
          uri: user.image[0]
        }}
      />
      <View>
        <Text style={styles.name}>{user.model}</Text>
        <Text style={styles.Trips}>
          {user.Trips} trips <Text>&bull;</Text> Published on {user.Host.Joined}
        </Text>
      </View>
    </Pressable>
  );
};

export default Listings;

const styles = StyleSheet.create({
  image: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 999,
    resizeMode: 'cover'
  },
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    borderWidth: 0.18,
    borderRadius: 99,
    marginVertical: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 30
  },
  Trips: {
    fontSize: 15,
    marginLeft: 30
  },
  details: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '400',
    marginTop: 10
  }
});
