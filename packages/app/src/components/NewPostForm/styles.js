import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  closeButton: {
    marginLeft: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  mainWrapper: {
    marginHorizontal: 20,
  },
  textInput: {
    fontSize: 20,
    margin: 10,
  },
  params: {
    fontSize: 18,
    marginLeft: 10,
  },
  boxText: {
    fontSize: 12,
    marginLeft: 10,
  },
  inputButton: {
    marginTop: 10,
  },
  Input: {
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#5465FF",
    width: 200,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button2: {
    backgroundColor: "#5465FF",
    width: 150,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  buttonDisplay: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  smallText: {
    fontSize: 10,
    marginLeft: 10,
    marginTop: -10,
  },
  CheckBox: {
    width: 150,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Description: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: '#b4b4b4',
    fontSize: 18
  },
  photoTricks: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15
  },
  photoText:{
    fontSize: 15,
    marginLeft: 15
  }
});

export default styles;
