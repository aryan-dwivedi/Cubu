import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import styles from "./styles.js";
import { useNavigation } from "@react-navigation/native";
import SuggestionRow from "./SuggestionRow";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

const DestinationSearchScreen = (props) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  console.log(location);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const showResults = () => {
    navigation.navigate("Search Result", {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Where are you going?"
        onPress={() => {
          navigation.navigate("Search Result");
        }}
        fetchDetails={true}
        minLength={1}
        styles={{
          textInput: styles.textInput,
          container: {
            backgroundColor: "white",
            borderRadius: 10,
            borderColor: "#5465FF",
            borderWidth: 1,
          },
        }}
        query={{
          key: "AIzaSyCQfXN8H3ZfzDSSXpFEyU94H7OZAatFfTA",
          language: "en",
          types: "(cities)",
          components: "country:in",
        }}
        suppressDefaultStyles
        renderRow={(item) => <SuggestionRow item={item} />}
      />
      <Pressable style={styles.row} onPress={() => showResults()}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={"location-arrow"} size={30} color={"#5465FF"} />
        </View>
        <Text style={styles.locationText}>Current Location</Text>
      </Pressable>
    </View>
  );
};

export default DestinationSearchScreen;
