import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#5465FF",
    width: 150,
    height: 50,
    borderRadius: 75,
    marginTop: Dimensions.get("screen").height / 1.4,
    marginLeft: Dimensions.get("screen").width / 3.33,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,
    flexDirection: "row",
  },
  buttonMap: {
    flexDirection: "row",
    marginRight: 5,
  },
  buttonFilters: {
    flexDirection: "row",
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    padding: 5,
    marginTop: -3,
    marginLeft: 3,
  },
});

export default styles;
