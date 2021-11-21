/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewPostForm from '../../components/NewPostForm';

const NewPostDetails = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity style={{ marginLeft: 25, marginTop: 50 }} onPress={() => navigation.goBack()}>
        <Icon name="md-close" size={35} color="black" />
      </TouchableOpacity>
      <NewPostForm />
    </>
  );
};

export default NewPostDetails;
