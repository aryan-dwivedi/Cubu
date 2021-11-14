import React from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";

const CustomMarker = (props) => {
  const { latitude, longitude, price, onPress, isSelected } = props;
  return (
    <Marker
      coordinate={{ latitude: latitude, longitude: longitude }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: isSelected ? "black" : "white",
          padding: 5,
          borderRadius: 20,
          borderColor: "grey",
          borderWidth: 1,
        }}
      >
        <Text
          style={{ fontWeight: "bold", color: isSelected ? "white" : "black" }}
        >
          ₹{price}
        </Text>
      </View>
    </Marker>
  );
};

export default CustomMarker;
