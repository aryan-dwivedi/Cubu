/* eslint-disable react-native/no-inline-styles */
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';

const HowItWorks = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
      <LinearGradient colors={['rgba(214,226,247,1)', 'rgba(241,224,248,1)']} style={{ flex: 1 }}>
        <View style={styles.boxContainer}>
          <Text style={styles.mainHeading}>Booking a Car</Text>
          <View style={styles.content}>
            <Text style={styles.heading}>Sign up</Text>
            <Text style={styles.contentText}>
              Sign up for Cubu with your email. We’ll confirm your identity and eligibility so you can become an approved driver.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Find the perfect car</Text>
            <Text style={styles.contentText}>
              Enter your travel dates and location and search our vast selection of unique, locally-owned cars.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Book it</Text>
            <Text style={styles.contentText}>
              Book the car of your dreams. The owner will confirm or decline your trip within eight hours, but typically it’s much sooner.
              Book cars instantly on listings with the “Book Instantly” badge.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Pick up the car</Text>
            <Text style={styles.contentText}>
              Meet the car owner to pick up the car. Many owners offer delivery, so they may bring it right to you. Walk around the car,
              show them your license, grab the keys, and drive off into the sunset.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Have the time of your life</Text>
            <Text style={styles.contentText}>
              Go explore! In the city or the woods, for a few days or a few weeks, rain or shine, grab your shades and go create something
              to write home about.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Return the car</Text>
            <Text style={styles.contentText}>
              At the end of your trip, replace the fuel you used and meet the owner to drop off the car. Walk around the car again, hand
              over the keys, give them a high five, and start planning your next adventure.
            </Text>
          </View>
        </View>

        <View style={styles.boxContainer}>
          <Text style={styles.mainHeading}>Listing your car</Text>
          <View style={styles.content}>
            <Text style={styles.heading}>List your car</Text>
            <Text style={styles.contentText}>
              Create a free listing with a few clicks. Describe your car, upload some clean photos, and you’re ready to go. Be sure to keep
              your calendar up to date so travelers know when your car is available.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Respond to requests</Text>
            <Text style={styles.contentText}>
              You’ll get notified when someone requests, or books your car instantly. Confirm or decline the trip as soon as possible, and
              contact the traveler if you have any questions.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Meet your guest</Text>
            <Text style={styles.contentText}>
              Coordinate where and when you’ll meet your guest. Check their license, walk around the car, check the fuel and mileage, and
              send them off on their adventure.
            </Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.heading}>Pick up your car</Text>
            <Text style={styles.contentText}>
              Meet your guest, make sure everything’s in order, give them a high five, and head on home. Don’t forget to rate and review
              them in the app to help keep our marketplace strong and honest.
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default HowItWorks;
