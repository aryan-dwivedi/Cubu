import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const NoResults = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Favorites</Text>
        <Text style={styles.description}>
          Not every day is filled with adventures, but you can start planning
          for the next one.
        </Text>
        <Text style={styles.description}>
          Tap the heart on any car to start saving your favorites here.
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableHighlight
          style={styles.findCarButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.findCarButtonText}>Find Cars</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default NoResults;

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#000000",
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#808080",
    paddingLeft: 20,
    paddingRight: 20,
  },
  footer: {
    position: "absolute",
    width: "100%",
    height: 80,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#a9a9a9",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: Dimensions.get('window').height/50
  },
  findCarButton: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 16,
    borderRadius: 15,
    backgroundColor: "#5465FF",
  },
  findCarButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});
