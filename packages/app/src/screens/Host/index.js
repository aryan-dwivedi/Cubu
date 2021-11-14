import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StatusBar, Pressable, } from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import Listings from '../../components/Listings'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Host = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar barStyle='dark-content' />
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
            <Pressable style={styles.button}
                onPress={() => navigation.navigate('New Post')}>
                <Text style={styles.buttonText}>Create new listing</Text>
            </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default Host
