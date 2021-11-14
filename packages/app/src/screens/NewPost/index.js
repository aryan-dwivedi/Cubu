import React from "react";
import { View, TouchableOpacity } from "react-native";
import NewPostForm from "../../components/NewPostForm";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const NewPostDetails = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        style={{marginLeft: 25, marginTop: 50}}
        onPress={() => navigation.goBack()}
      >
        <Icon name="md-close" size={35} color="black" />
      </TouchableOpacity>
      <NewPostForm />
    </>
  );
};

export default NewPostDetails;
