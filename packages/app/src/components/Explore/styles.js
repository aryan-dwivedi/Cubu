import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 150,
    width: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  innerContainer: {
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 10,
    flexDirection: "row",
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    alignItems: 'center',
  },
  text: {
    ...Platform.select({
      ios: {
        fontWeight: '800',
        fontSize: 20,
      },
      android: {
        fontWeight: 'bold',
        fontSize: 20,
      }
  }),
    color: 'white',
    marginTop: 110
  }
});

export default styles;
