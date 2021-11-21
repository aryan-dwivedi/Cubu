import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const Post = props => {
  const post = props.post;

  const [fav, setfav] = useState(false);

  const addToFavourites = () => {
    setfav(!fav);
  };

  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('Post', { post: post });
  };

  return (
    <SafeAreaView>
      <Pressable onPress={goToPostPage} style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.addToFavourites} onPress={() => addToFavourites()}>
            <Ionicons name={fav ? 'md-heart' : 'md-heart-outline'} size={35} color="#ff6347" />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={{
              uri: post.pictureUrl
            }}
          />
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
      </Pressable>
    </SafeAreaView>
  );
};

export default Post;
