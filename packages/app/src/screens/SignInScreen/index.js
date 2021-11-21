/* eslint-disable react-native/no-inline-styles */
import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { AuthContext } from '../../navigation/Context';
import styles from './styles';

const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(3).max(20).required('Password is required')
});

const SignInScreen = ({ navigation }) => {
  const [login, { data, error, loading }] = useMutation(LOGIN);
  const { signIn } = React.useContext(AuthContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const updateSecureTextEntry = () => setSecureTextEntry(!secureTextEntry);

  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async data => {
    login({ variables: data });
  };

  useEffect(() => {
    if (data) {
      const { login } = data;
      if (login.errors) {
        Alert.alert('Oops', login.errors[0].message);
      } else {
        signIn(login.sessionId);
      }
    } else if (error) {
      Alert.alert('Oops', 'Sign in Failed', [{ text: 'Try Again' }]);
    }
  }, [data, error, signIn]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5465FF" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: '#FFFFFF'
          }
        ]}
      >
        <Controller
          name="email"
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: '#000'
                  }
                ]}
              >
                Email
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color={'#000'} size={20} />
                <TextInput
                  placeholder="Your Email"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: '#000'
                    }
                  ]}
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            </View>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: '#000',
                    marginTop: 35
                  }
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={'#000'} size={20} />
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={!!secureTextEntry}
                  style={[
                    styles.textInput,
                    {
                      color: '#000'
                    }
                  ]}
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {secureTextEntry ? <Feather name="eye-off" color="grey" size={20} /> : <Feather name="eye" color="grey" size={20} />}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Forgot Password Screen')}>
          <Text style={{ color: '#5465FF', marginTop: 15 }}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} title="Submit" onPress={handleSubmit(onSubmit)}>
            {!loading ? (
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#ffffff'
                  }
                ]}
              >
                Sign In
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#ffffff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp Screen')}
            style={[
              styles.signUp,
              {
                borderColor: '#5465FF',
                borderWidth: 1,
                marginTop: 15
              }
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: '#5465FF'
                }
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
