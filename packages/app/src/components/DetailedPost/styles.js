import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.6;
const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  line: {
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  details: {
    marginLeft: 15,
  },
  hostdetails: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  pagingText: {
    color: '#888',
    margin: 3,
    fontSize: width / 40,
  },
  pagingActiveText: {
    color: 'white',
    margin: 3,
    fontSize: width / 40,
  },
  rating: {
    marginTop: 15,
    fontSize: 18,
  },
  location: {
    marginTop: 10,
    fontSize: 18,
  },
  descriptiontext: {
    marginTop: 15,
    fontSize: 18,
  },
  hostimage: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 999,
    resizeMode: 'cover',
  },
  none: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  features: {
    marginTop: 15,
    fontSize: 18,
    flexDirection: 'row',
    alignContent: 'center',
    display: 'flex',
  },
  featuresDetails: {
    alignItems: 'center',
  },
  featurestext: {
    fontWeight: 'bold',
  },
  model: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  year: {
    fontSize: 18,
  },
  trips: {
    color: '#a9a9a9',
  },
  hostname: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  Trips: {
    fontSize: 15,
    marginLeft: 30,
  },
  button: {
    backgroundColor: '#5465FF',
    width: 200,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 5,
  },
});

export default styles;
