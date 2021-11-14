import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: '#f0f0f0',
    flex: 1
  },
  textInput: {
    fontSize: 20,
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  iconContainer: {
    backgroundColor: '#e7e7e7',
    padding: 7,
    borderRadius: 10,
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    borderBottomColor: '#5465FF',
    borderBottomWidth: 1,
  },
  searchIcon: {
    paddingRight: 10
  },
  locationText: {
    fontSize: 18,
  }
});

export default styles;