import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import host from '../../../assets/data/host';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import{ AuthContext } from '../../navigation/Context';

const user = host[0];

const Profile = () => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const navigation = useNavigation();
  const { signOut } = React.useContext(AuthContext);
  return (
    <View>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Image
            style={styles.image}
            source={{
              uri: user.Image,
            }}
          />
          <View>
            <Text style={styles.name}>{user.Name}</Text>
            <Text style={styles.Trips}>
              {user.Trips} trips <Text>&bull;</Text> Joined on {user.Joined}
            </Text>
          </View>
        </SafeAreaView>

        <View style={styles.line}></View>

        <AnimatedTouchable style={styles.options}>
          <MaterialCommunityIcons
            name="account"
            size={25}
            color={'#282C35'}></MaterialCommunityIcons>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          <Text style={styles.optionstext}>Account</Text>
        </AnimatedTouchable>

        <AnimatedTouchable style={styles.options}>
          <MaterialIcons
            name="wallet-travel"
            size={25}
            color={'#282C35'}></MaterialIcons>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          <Text style={styles.optionstext}>Past Trips</Text>
        </AnimatedTouchable>

        <View style={styles.line}></View>

        <AnimatedTouchable style={styles.options}>
          <MaterialIcons
            name="payment"
            size={25}
            color={'#282C35'}></MaterialIcons>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          <Text style={styles.optionstext}>Payment Settings</Text>
        </AnimatedTouchable>

        <View style={styles.line}></View>

        <AnimatedTouchable
          style={styles.options}
          onPress={() => navigation.navigate('HowItWorks')}>
          <FontAwesome5
            name="question"
            size={25}
            color={'#282C35'}></FontAwesome5>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          <Text style={styles.optionstext}>How it Works?</Text>
        </AnimatedTouchable>

        <AnimatedTouchable style={styles.options}>
          <MaterialIcons
            name="call"
            size={25}
            color={'#282C35'}></MaterialIcons>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          <Text style={styles.optionstext}>Get Help</Text>
        </AnimatedTouchable>

        <View style={styles.line}></View>

        <AnimatedTouchable
          style={styles.options}
          onPress={() => {
            signOut();
          }}>
          <MaterialIcons
            name="logout"
            size={25}
            color={'#282C35'}></MaterialIcons>
          <Text>&nbsp;&nbsp;&nbsp;</Text>
          <Text style={styles.optionstext}>Log Out</Text>
        </AnimatedTouchable>
      </ScrollView>
    </View>
  );
};

export default Profile;
