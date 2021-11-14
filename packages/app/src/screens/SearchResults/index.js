import React from "react";
import {
  View,
  FlatList,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import Post from "../../components/Post";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";

const QUERY = gql`
  query searchListings(
    $latitude: Float
    $longitude: Float
    $offset: Int!
    $limit: Int!
  ) {
    searchListings(
      latitude: $latitude
      longitude: $longitude
      offset: $offset
      limit: $limit
    ) {
      id
      make
      model
      year
      pictureUrl
      price
      latitude
      longitude
      description
      features
      owner {
        id
        email
      }
    }
  }
`;

const SearchResultsScreen = (props) => {
  const route = useRoute();
  const navigation = useNavigation();

  const { loading, data } = useQuery(QUERY, {
    variables: {
      latitude: route.params.latitude,
      longitude: route.params.longitude,
      offset: 0,
      limit: 10,
    },
  });

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data.searchListings}
          renderItem={({ item }) => <Post post={item} />}
        />
      )}
      <View style={styles.button}>
        <Pressable
          style={styles.buttonMap}
          onPress={() =>
            navigation.navigate("Search Result Map", {
              latitude: route.params.latitude,
              longitude: route.params.longitude,
            })
          }
        >
          <FontAwesome name="map-o" size={20} color={"white"}></FontAwesome>
          <Text style={styles.buttonText}>Map View</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SearchResultsScreen;
