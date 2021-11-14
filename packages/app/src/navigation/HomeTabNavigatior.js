import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import HomeScreen from "../screens/Home";
import Host from "../screens/Host";
import Profile from "../screens/Profile";
import Saved from "../screens/Saved";
import Messages from "../screens/Messages";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#5465FF",
        tabBarBackgroundColor: "#fff",
      }}
    >
      <Tab.Screen
        name={"Home Tab"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Fontisto name="search" size={20} color={color} />
              <Text
                style={{
                  color: focused ? "#5465FF" : "#8e8e8e",
                  fontSize: focused ? 13.5 : 12,
                  paddingTop: 5,
                }}
              >
                Explore
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Saved Tab"}
        component={Saved}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Feather name="heart" size={20} color={color} />
              <Text
                style={{
                  color: focused ? "#5465FF" : "#8e8e8e",
                  fontSize: focused ? 13 : 12,
                  paddingTop: 5,
                }}
              >
                Favourites
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Host Tab"}
        component={Host}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <FontAwesome5 name="car" size={20} color={color} />
              <Text
                style={{
                  color: focused ? "#5465FF" : "#8e8e8e",
                  fontSize: focused ? 13 : 12,
                  paddingTop: 5,
                }}
              >
                Host
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Messages"}
        component={Messages}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Feather name="message-square" size={20} color={color} />
              <Text
                style={{
                  color: focused ? "#5465FF" : "#8e8e8e",
                  fontSize: focused ? 13 : 12,
                  paddingTop: 5,
                }}
              >
                Messages
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Profile Tab"}
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <FontAwesome name="user" size={20} color={color} />
              <Text
                style={{
                  color: focused ? "#5465FF" : "#8e8e8e",
                  fontSize: focused ? 13 : 12,
                  paddingTop: 5,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
