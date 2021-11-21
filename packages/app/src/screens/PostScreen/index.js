import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import DetailedPost from '../../components/DetailedPost';

const PostScreen = () => {
  const route = useRoute();
  const post = route.params.post;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ backgroundColor: 'white' }}>
      <DetailedPost post={post} />
    </View>
  );
};

export default PostScreen;
