import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 200,
    width: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8
  },
  innerContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    height: '80%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover'
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});

export default styles;
