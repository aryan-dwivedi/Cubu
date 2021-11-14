import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import styles from './styles';
import {LinearGradient} from 'expo-linear-gradient'

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#5465FF' barStyle="light-content" />
                <LinearGradient colors={['rgba(38,58,209,1)', 'rgba(255,255,255,1)']} style={{flex: 1}}>
                <View style={styles.header}>
                    <Animatable.Image
                        animation="bounceIn"
                        duraton="1500"
                        source={require('../../img/Cubu-white.png')}
                        style={styles.logo}
                        resizeMode="stretch"
                    />
                </View>
                <Animatable.View
                    style={[styles.footer, {
                        backgroundColor: '#FFFFFF'
                    }]}
                    animation="fadeInUpBig"
                >
                    <Text style={[styles.title, {
                        color: '#000'
                    }]}>Move Around!</Text>
                    <Text style={styles.text}>Sign in with account</Text>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn} onPress={() => navigation.navigate('SignIn Screen')}>
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="#fff"
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
                </LinearGradient>
            </View>
    );
};

export default SplashScreen;