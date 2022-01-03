import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 600,
    height: 200,
    zIndex: 1
  },
  text: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 12
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 250,
    backgroundColor: '#fff',
    borderRadius: 999,
    height: 1000,
    width: 1000
  }
});

export default styles;
