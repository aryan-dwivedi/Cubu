import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginVertical: 10
  },
  innerContainer: {
    height: 140,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 5
  },
  image: {
    height: '70%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 999
  },
  rating: {
    marginTop: 15,
    fontSize: 18
  },
  Username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10
  },
  about: {
    fontSize: 12,
    marginVertical: 10,
    marginRight: 70
  }
});

export default styles;
