import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import styles from "./styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useMutation } from "@apollo/client";
import { Input, CheckBox } from "react-native-elements";
import MaterailIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

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

export default function NewPostForm() {
  const [formStep, setFormStep] = React.useState(0);
  const [register, { data, error }] = useMutation(REGISTER);
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    register({ variables: data });
  };
  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  const prevFormStep = () => {
    setFormStep(formStep + 1);
  };

  const renderButton = () => {
    if (formStep > 3) {
      return undefined;
    } else if (formStep === 0) {
      return (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={nextFormStep}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (formStep === 2) {
      return (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={nextFormStep}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonDisplay}>
          <TouchableOpacity style={styles.button2} onPress={prevFormStep}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={nextFormStep}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {formStep === 0 && (
        <ScrollView>
          <Text style={styles.heading}>List your car (1/3)</Text>
          <View style={styles.content}>
            <Controller
              name="address"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.mainWrapper}>
                  <Text style={styles.params}>Where is your car located?</Text>
                  <GooglePlacesAutocomplete
                    placeholder="Enter Address"
                    fetchDetails={true}
                    minLength={1}
                    styles={{
                      textInput: styles.textInput,
                      container: {
                        backgroundColor: "white",
                        borderRadius: 10,
                        borderStyle: "solid",
                        borderWidth: 1,
                        margin: 10,
                        height: 40,
                      },
                    }}
                    query={{
                      key: "AIzaSyCQfXN8H3ZfzDSSXpFEyU94H7OZAatFfTA",
                      language: "en",
                      types: "(cities)",
                      components: "country:in",
                    }}
                    suppressDefaultStyles
                  />
                </View>
              )}
            />

            <Controller
              name="make"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.mainWrapper}>
                  <Text style={styles.params}>What is make of your car?</Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Input
                      placeholder="Make"
                      containerStyle={{
                        backgroundColor: "transparent",
                        borderBottomColor: "transparent",
                        borderTopColor: "transparent",
                      }}
                      inputContainerStyle={{
                        backgroundColor: "trasnaprent",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderStyle: "solid",
                        height: 40,
                        paddingLeft: 4,
                      }}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Controller
              name="model"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.mainWrapper}>
                  <Text style={styles.params}>What is model of your car?</Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Input
                      autoCompleteType="street-address"
                      placeholder="Model"
                      containerStyle={{
                        backgroundColor: "transparent",
                        borderBottomColor: "transparent",
                        borderTopColor: "transparent",
                      }}
                      inputContainerStyle={{
                        backgroundColor: "trasnaprent",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderStyle: "solid",
                        height: 40,
                        paddingLeft: 4,
                      }}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            <Controller
              name="year"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.mainWrapper}>
                  <Text style={styles.params}>
                    Manufacturing year of your car?
                  </Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Input
                      placeholder="Year"
                      containerStyle={{
                        backgroundColor: "transparent",
                        borderBottomColor: "transparent",
                        borderTopColor: "transparent",
                      }}
                      inputContainerStyle={{
                        backgroundColor: "trasnaprent",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderStyle: "solid",
                        height: 40,
                        paddingLeft: 4,
                      }}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.mainWrapper}>
                  <Text style={styles.params}>
                    What price you want to rent your car?
                  </Text>
                  <TouchableOpacity style={styles.inputButton}>
                    <Input
                      placeholder="Price"
                      containerStyle={{
                        backgroundColor: "transparent",
                        borderBottomColor: "transparent",
                        borderTopColor: "transparent",
                      }}
                      inputContainerStyle={{
                        backgroundColor: "trasnaprent",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderStyle: "solid",
                        height: 40,
                        paddingLeft: 4,
                      }}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          {renderButton()}
        </ScrollView>
      )}
      {formStep === 1 && (
        <ScrollView>
          <Text style={styles.heading}>Car details (2/3)</Text>
          <View style={styles.content}>
            <View style={styles.mainWrapper}>
              <Text style={styles.params}>License plate number</Text>
              <TouchableOpacity style={styles.inputButton}>
                <Input
                  placeholder="Plate number"
                  containerStyle={{
                    backgroundColor: "transparent",
                    borderBottomColor: "transparent",
                    borderTopColor: "transparent",
                  }}
                  inputContainerStyle={{
                    backgroundColor: "trasnaprent",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderStyle: "solid",
                    paddingHorizontal: 4,
                    height: 40,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.smallText}>
                Your license plate information won’t be publicly visible
              </Text>
            </View>

            <View style={styles.mainWrapper}>
              <Text></Text>
              <Text></Text>
              <Text style={styles.params}>Car features</Text>
              <Text></Text>
              <View style={styles.CheckBox}>
                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />

                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />
              </View>
              <View style={styles.CheckBox}>
                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />

                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />
              </View>
              <View style={styles.CheckBox}>
                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />

                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />
              </View>
              <View style={styles.CheckBox}>
                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />

                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />
              </View>
              <View style={styles.CheckBox}>
                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />

                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />
              </View>
              <View style={styles.CheckBox}>
                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />

                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />
              </View>
              <View style={styles.CheckBox}>
                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />

                <CheckBox
                  title="Click Here"
                  checkedIcon={
                    <MaterailIcons
                      name="check-box"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                  uncheckedIcon={
                    <MaterailIcons
                      name="check-box-outline-blank"
                      size={25}
                      color={"#5465FF"}
                    />
                  }
                />
              </View>
              <Text></Text>
              <Text style={styles.params}>Description</Text>
              <TextInput
                placeholder="No need to include your contact info or pickup instructions. Guests will receive those once they book your car."
                style={styles.Description}
                multiline={true}
              />
            </View>
          </View>
          {renderButton()}
        </ScrollView>
      )}
      {formStep === 2 && (
        <ScrollView>
          <Text style={styles.heading}>Car photos (3/3)</Text>
          <View style={styles.content}>
            <View style={styles.mainWrapper}>
              <Text style={styles.params}>
                High quality photos increase your earning potential by
                attracting more guests. Upload at least 6 photos, including
                multiple exterior angles with the whole car in frame, as well as
                interior shots.
              </Text>
              <View style={styles.photoTricks}>
                <Fontisto name="day-sunny" size={50} color="black" />
                <Text style={styles.photoText}>Shoot during the daytime</Text>
              </View>
              <View style={styles.photoTricks}>
                <MaterialCommunityIcons
                  name="television-clean"
                  size={50}
                  color="black"
                />
                <Text style={styles.photoText}>Take clear, crisp photos</Text>
              </View>
              <View style={styles.photoTricks}>
                <Foundation name="trees" size={50} color="black" />
                <Text style={styles.photoText}>
                  Try somewhere open or scenic
                </Text>
              </View>
              <View style={styles.photoTricks}>
                <Entypo name="traffic-cone" size={50} color="black" />
                <Text style={styles.photoText}>Look out for moving cars</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Add Photos</Text>
                </Pressable>
              </View>
            </View>
          </View>
          {renderButton()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
