/* eslint-disable react-native/no-inline-styles */
import { gql, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import styles from './styles';

const FORGOT_PASSWORD = gql`
  mutation Mutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required')
});

const ForgotPasswordScreen = () => {
  const [forgotPassword, { data, loading, error }] = useMutation(FORGOT_PASSWORD);
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [mailSent, setMailSent] = useState(false);

  const onSubmit = async vars => {
    forgotPassword({ variables: vars });
  };

  useEffect(() => {
    if (data) {
      setMailSent(true);
    } else if (error) {
      Alert.alert('Oops', 'Forgot Password Failed', [{ text: 'Try Again' }]);
    }
  }, [data, error]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5465FF" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Reset your Password</Text>
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

        <View style={styles.textPrivate}>{mailSent && <Text style={styles.color_textPrivate}>{data.sendForgotPasswordEmail}</Text>}</View>
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
                Send Password Reset Link
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#ffffff" />
            )}
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ForgotPasswordScreen;
