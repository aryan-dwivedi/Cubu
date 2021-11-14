import { StyleSheet, Dimensions}  from 'react-native';

const {height} = Dimensions.get("screen");
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 0.5,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo * 1.6,
      height: height_logo * 0.9
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 50,
      paddingLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row',
      backgroundColor: '#5465FF'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18
  }
});

export default styles;