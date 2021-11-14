import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 120,
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
  },
  rating: {
    marginTop: 15,
    fontSize: 18,
  },
  model: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  prices: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10,
  },
  newprice: {
      fontSize: 17,
      fontWeight: 'bold',
  },
  oldprice: {
    color: '#5b5b5b',
    textDecorationLine: 'line-through',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
