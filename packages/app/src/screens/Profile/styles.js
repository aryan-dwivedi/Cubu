import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 999,
    resizeMode: 'cover'
  },
  container: {
    marginLeft: 20,
    marginTop: 30,
    flexDirection: 'row'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 30
  },
  Trips: {
    fontSize: 15,
    marginLeft: 30
  },
  line: {
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
    marginVertical: 15
  },
  optionstext: {
    fontSize: 20,
    fontWeight: '500',
    color: '#464647'
  },
  options: {
    marginLeft: 30,
    flexDirection: 'row',
    marginVertical: 20
  }
});

export default styles;
