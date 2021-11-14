import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StatusBar,
  Pressable,
} from "react-native";
import styles from "./styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { useNavigation } from "@react-navigation/native";

const Reviews = (props) => {
  const navigation = useNavigation();
  const post = props.post;
  const width = useWindowDimensions().width;
  const goToPostPage = () => {
    navigation.navigate("Post", { postId: post.id });
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Pressable
        style={[styles.container, { width: width - 60 }]}
        onPress={goToPostPage}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={{
              uri: post.Reviews[0].Image,
            }}
          />
          <View style={{ marginHorizontal: 10 }}>
            <View style={{flexDirection: 'row',  alignItems: 'center'}}>
              <Text style={styles.rating}>
                {post.Reviews[0].Rating} {}
                <Fontisto name="star" size={18} color={"#5465FF"}></Fontisto>
              </Text>
              <Text style={styles.Username}>{post.Reviews[0].Name}</Text>
            </View>
            <Text numberOfLines={5} style={styles.about}>{post.Reviews[0].About}</Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default Reviews;
