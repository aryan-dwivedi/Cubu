import React, { useRef } from 'react';
import { Dimensions, Image, Pressable, SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import reviews from '../../../assets/data/feed';
import FixedBottom from '../FixedBottom';
import Reviews from '../Reviews';
import styles from './styles';

const DetailedPost = props => {
  const post = props.post;
  const flatlist = useRef();
  const images = post.pictureUrl;
  const { width } = Dimensions.get('window');
  const height = width * 0.6;

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ScrollView pagingEnabled horizontal style={{ width, height }} showsHorizontalScrollIndicator={false}>
            {/* {images.map((image, index) => ( */}
            <Image
              // key={index}
              style={styles.image}
              source={{
                uri: images
              }}
            />
            {/* ))} */}
          </ScrollView>
          {/* <View style={styles.pagination}>
            {images.map((i, k) => (
              <Text key={k} style={styles.pagingText}>
                ⬤
              </Text>
            ))}
          </View> */}
        </View>

        <View style={styles.details}>
          <Text style={styles.model}>
            {post.make} {post.model}
            <Text>&nbsp; </Text>
            <Text style={styles.year}>{post.year}</Text>
          </Text>
          <Text style={styles.rating}>
            {post.rating} {}
            <Fontisto name="star" size={18} color={'#5465FF'} />
            <Text style={styles.trips}>
              <Text>&nbsp;</Text> ({post.trips} trips)
            </Text>
          </Text>
        </View>
        <View style={styles.line} />
        {/*  Trip Dates */}

        <View style={styles.details}>
          <Text style={styles.heading}>Location</Text>
          <Text style={styles.location}>
            <Entypo name="location-pin" size={25} color={'#5465FF'} />
            <Text>&nbsp;</Text>
            Kanpur
          </Text>
        </View>
        <View style={styles.line} />

        {/*  Features */}
        {/* <View style={styles.details}>
          <View style={styles.features}>
            <View style={styles.featuresDetails}>
              <MaterialCommunityIcons
                name="car-seat"
                size={25}
                color={'#5465FF'}></MaterialCommunityIcons>
              <Text style={styles.featurestext}>
                {post.features[0].seats} Seats
              </Text>
            </View>
            <Text> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Text>
            <View style={styles.featuresDetails}>
              <MaterialCommunityIcons
                name="gas-station"
                size={25}
                color={'#5465FF'}></MaterialCommunityIcons>
              <Text style={styles.featurestext}>{post.features[0].fuel}</Text>
            </View>
            <Text> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Text>
            <View style={styles.featuresDetails}>
              <MaterialCommunityIcons
                name="fuel"
                size={25}
                color={'#5465FF'}></MaterialCommunityIcons>
              <Text style={styles.featurestext}>
                {post.features[0].mileage} kmpl
              </Text>
            </View>
            <Text> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Text>
            <View style={styles.featuresDetails}>
              <Entypo name="flow-tree" size={25} color={'#5465FF'}></Entypo>
              <Text style={styles.featurestext}>
                {post.features[0].transmission}
              </Text>
            </View>
          </View>
        </View> */}
        <View style={styles.line} />

        {/*
        <View style={styles.details}>
          <Text style={styles.heading}>Features</Text>
          <View style={styles.features}>
            <View>
              {post.features[0].ac ? (
                <View>
                  <MaterialCommunityIcons
                    name="air-conditioner"
                    size={25}
                    color={'#5465FF'}></MaterialCommunityIcons>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;</Text>
            <View>
              {post.features[0].bluetooth ? (
                <View>
                  <Fontisto
                    name="bluetooth-b"
                    size={25}
                    color={'#5465FF'}></Fontisto>
                  <Text style={styles.featurestext}></Text>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;</Text>
            <View>
              {post.features[0].gps ? (
                <View>
                  <MaterialCommunityIcons
                    name="crosshairs-gps"
                    size={25}
                    color={'#5465FF'}></MaterialCommunityIcons>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;</Text>
            <View>
              {post.features[0].parkingAssist ? (
                <View>
                  <MaterialCommunityIcons
                    name="car-brake-parking"
                    size={25}
                    color={'#5465FF'}></MaterialCommunityIcons>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;</Text>
            <View>
              {post.features[0].heatedSeats ? (
                <View>
                  <MaterialCommunityIcons
                    name="car-seat-heater"
                    size={25}
                    color={'#5465FF'}></MaterialCommunityIcons>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;</Text>
            <View>
              {post.features[0].usbInput ? (
                <View>
                  <MaterialCommunityIcons
                    name="usb-port"
                    size={25}
                    color={'#5465FF'}></MaterialCommunityIcons>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;</Text>
            <View>
              {post.features[0].sunroof ? (
                <View>
                  <Feather name="sun" size={25} color={'#5465FF'}></Feather>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;;</Text>
            <View>
              {post.features[0].smartScreen ? (
                <View>
                  <MaterialIcons
                    name="fit-screen"
                    size={25}
                    color={'#5465FF'}></MaterialIcons>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            <Text>&nbsp; &nbsp; &nbsp;</Text>
            <View>
              {post.features[0].childSeat ? (
                <View>
                  <MaterialCommunityIcons
                    name="car-child-seat"
                    size={25}
                    color={'#5465FF'}></MaterialCommunityIcons>
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </View> */}
        <View style={styles.line} />

        {/*  Description */}
        <View style={styles.details}>
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.descriptiontext}>{post.description}</Text>
        </View>
        <View style={styles.line} />

        {/* Rating & Reviews */}
        <View style={styles.details}>
          <Text style={styles.heading}>Rating & Reviews</Text>
          <View>
            <FlatList
              ref={flatlist}
              data={reviews}
              renderItem={({ item }) => <Reviews post={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - 60}
              snapToAlignment={'center'}
              decelerationRate={'fast'}
            />
          </View>
        </View>
        <View style={styles.line} />

        {/*  Hosted By */}
        {/* <View style={styles.details}>
          <Text style={styles.heading}>Hosted By</Text>
          <Text>&nbsp; &nbsp; &nbsp;</Text>
          <View style={styles.hostdetails}>
            <Image
              style={styles.hostimage}
              source={{
                uri: post.Host.Image,
              }}
            />
            <View>
              <Text style={styles.hostname}>{post.Host.Name}</Text>
              <Text style={styles.Trips}>
                {post.Host.Trips} trips <Text>&bull;</Text> Joined on{' '}
                {post.Host.Joined}
              </Text>
            </View>
          </View>
        </View> */}
      </ScrollView>
      <FixedBottom style={styles.fixedBottom}>
        <View style={styles.buttonView}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Book now</Text>
          </Pressable>
        </View>
      </FixedBottom>
    </SafeAreaView>
  );
};

export default DetailedPost;
