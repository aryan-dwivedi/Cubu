import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Listings from '../../components/Listings';
import styles from './styles';

const Host = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.heading}>Your Listings</Text>
        <Pressable>
          <Icon name="settings" size={30} color="black" />
        </Pressable>
      </View>
      <ScrollView>
        <Listings />
      </ScrollView>
      <View style={styles.buttonCenter}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('New Post')}>
          <Text style={styles.buttonText}>Create new listing</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Host;
