import React from 'react'
import { View } from 'react-native';
import styles from './styles'
import NoResults from '../../components/Saved/NoResults'

const Saved = () => {
    return (
        <View style={styles.wrapper}>
            <NoResults />
        </View>
    )
}

export default Saved
