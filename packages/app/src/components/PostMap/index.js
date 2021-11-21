/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import styles from './styles';

const PostMap = props => {
  const navigation = useNavigation();
  const post = props.post;
  const width = useWindowDimensions().width;
  const goToPostPage = () => {
    navigation.navigate('Post', { postId: post.id });
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Pressable style={[styles.container, { width: width - 60 }]} onPress={goToPostPage}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={{
              uri: post.pictureUrl
            }}
          />
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            {/* <Text style={styles.rating}>
              {post.rating} {}
              <Fontisto name="star" size={18} color={"#FDCC0D"}></Fontisto>
            </Text> */}
            <Text style={styles.model}>
              {post.make} {post.model}
            </Text>

            <View style={styles.prices}>
              <Text style={styles.newprice}>₹​ {post.price}/day</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default PostMap;
