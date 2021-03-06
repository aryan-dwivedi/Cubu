/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import categories from '../../../assets/data/categories';
import experiances from '../../../assets/data/experiances';
import Explore from '../../components/Explore';
import Featured from '../../components/Featured';
import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <StatusBar backgroundColor="#5465FF" barStyle="dark-content" />
      <Pressable style={styles.searchButton} onPress={() => navigation.navigate('Destination Search')}>
        <Fontisto name="search" size={20} color={'#5465FF'} />
        <Text style={styles.searchButtonText}> Where are you going?</Text>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['rgba(214,226,247,1)', 'rgba(241,224,248,1)']} style={{ flex: 1 }}>
          <Text style={styles.largeHeadingText}>Far better then rental cars</Text>
          <Pressable style={styles.button} onPress={() => navigation.navigate('HowItWorks')}>
            <Text style={styles.buttonText}>How it works?</Text>
          </Pressable>
          <View style={styles.wrapper}>
            <View style={styles.explore}>
              <Text style={styles.headingText}>Explore Cubu</Text>
              <FlatList
                data={categories}
                renderItem={({ item }) => <Explore explore={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.experiance}>
              <Text style={styles.headingText}>Experiances</Text>
              <FlatList
                data={experiances}
                renderItem={({ item }) => <Featured experiances={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.experiance}>
              <Text style={styles.developing}>Devloping</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
