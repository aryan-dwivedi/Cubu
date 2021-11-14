import React from 'react'
import { SafeAreaView, Text, Image, View, Pressable } from 'react-native'
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const Featured = (props) => {
  const experiances = props.experiances
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.navigate('Comming Soon')} style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={{
              uri: experiances.image,
            }}
          />
          <View style={{flex: 1, marginVertical: 8}}>
            <Text style={styles.text}>{experiances.name}</Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default Featured
