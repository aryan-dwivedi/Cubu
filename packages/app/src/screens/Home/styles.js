import { StyleSheet, Dimensions, Platform } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  ImageBackground: {
    height: 550,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "black",
    width: 140,
    height: 40,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  largeHeadingText: {
    color: "black",
    fontSize: 50,
    fontWeight: "bold",
    width: "70%",
    marginLeft: 25,
    marginTop: 150,
  },
  searchButton: {
    backgroundColor: "white",
    height: 55,
    width: Dimensions.get("screen").width - 100,
    borderRadius: 30,
    marginLeft: Dimensions.get("screen").width / 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    ...Platform.select({
      ios: {
        top: 60,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
      },
      android: {
        top: 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      },
    }),
    zIndex: 1000,
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
  },
 developing: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
    color: "black",
  },
  explore: {
    ...Platform.select({
      ios: {
        top: 30,
      },
      android: {
        top: 30,
      },
    }),
  },
  experiance: {
    ...Platform.select({
      ios: {
        top: 60,
      },
      android: {
        top: 60,
      },
    }),
  },
});

export default styles;
