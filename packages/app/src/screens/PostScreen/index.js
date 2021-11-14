import React from 'react'
import {View} from 'react-native'
import DetailedPost from '../../components/DetailedPost'
import {useRoute} from '@react-navigation/native'

const PostScreen = (props) =>  {


    const route  = useRoute();
    const post = route.params.post;

    return (
        <View style={{backgroundColor: 'white'}}>
            <DetailedPost post={post} />
        </View>
    )
}

export default PostScreen;
