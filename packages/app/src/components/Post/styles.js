import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        padding: 7,
        marginBottom: 10,
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
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
      },
    image: {
        width: '100%',
        aspectRatio: 3 / 2,
        resizeMode: 'cover',
    },
    rating: {
        marginTop: 15,
        fontSize: 18,
        marginLeft: 20
    },
    model: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 15
    },
    prices: {
      flexDirection: 'row',
      alignContent: 'center',
      marginLeft: 20,
      marginBottom: 10,
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
      marginBottom: 10,
    },
    addToFavourites: {
      position: 'absolute',
      right: 12,
      top: 7,
      zIndex: 20,
    }
})

export default styles;