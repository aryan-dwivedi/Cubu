import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    heading: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#5465FF',
        width: 200,
        height: 40,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    buttonCenter:{
        alignItems: 'center'
    }
})

export default styles;