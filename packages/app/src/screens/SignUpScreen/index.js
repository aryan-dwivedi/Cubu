import { gql, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as yup from "yup";
import styles from "./styles";

const REGISTER = gql`
  mutation Register($password: String!, $email: String!, $name: String!) {
    register(password: $password, email: $email, name: $name) {
      path
      message
    }
  }
`;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(3).max(20).required("Password is required"),
});

const SignUpScreen = () => {
  const [register, { data, error }] = useMutation(REGISTER);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const updateSecureTextEntry = () => setSecureTextEntry(!secureTextEntry);

  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    register({ variables: data });
  };

  useEffect(() => {
    if (data) {
      const { register } = data;
      if (register[0].path == "Submit") {
        Alert.alert("Success!", register[0].message, [{ text: "OK" }]);
      } else if (register[0].path == "email") {
        Alert.alert("Oops!", register[0].message, [{ text: "OK" }]);
      }
    } else if (error) {
      Alert.alert("Oops!", "Registeration Failed", [{ text: "Try Again" }]);
    }
  }, [data, error]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5465FF" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: '#FFFFFF',
          },
        ]}
      >
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: '#000',
                  },
                ]}
              >
                Name
              </Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color={'#000'} size={20} />
                <TextInput
                  placeholder="Your name"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: '#000',
                    },
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
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: '#000',
                    marginTop: 35,
                  },
                ]}
              >
                Email
              </Text>
              <View style={styles.action}>
                <Feather name="mail" color={'#000'} size={20} />
                <TextInput
                  placeholder="Your email"
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: '#000',
                    },
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
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: '#000',
                    marginTop: 35,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color={'#000'} size={20} />
                <TextInput
                  placeholder="Create your password"
                  placeholderTextColor="#666666"
                  secureTextEntry={secureTextEntry ? true : false}
                  style={[
                    styles.textInput,
                    {
                      color: '#000',
                    },
                  ]}
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By signing up you agree to our
          </Text>
          <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
            {" "}
            Terms of service
          </Text>
          <Text style={styles.color_textPrivate}> and</Text>
          <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
            {" "}
            Privacy policy
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#ffffff",
                },
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

export default SignUpScreen;
