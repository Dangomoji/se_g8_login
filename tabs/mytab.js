import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerActions,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../authContext";
import Icon from "react-native-vector-icons/Entypo";

import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";
import RequestExtraWorkScreen from "../screens/requestExtraWork";
import AssignScreen from "../screens/assign";
import UserHeader from "../screens/userHeader";
import DrawerContent from "./DrawerContent";

const StackNav = (user) => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "#0163d2",
        headerStyle: {
          backgroundColor: "#0163d2",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerLeft: () => {
          return (
            <Icon
              name="menu"
              onPress={() => navigation.openDrawer()}
              size={30}
              color="#fff"
            />
          );
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="ประวัติรายงานขอขึ้นเวรฉุกเฉิน"
        component={RequestExtraWorkScreen}
      />
      <Stack.Screen name="อนุมัติการแลกเวร" component={AssignScreen} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = ({ user }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <DrawerContent {...props} handleLogout={handleLogout} />
      )}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        cardStyle: { backgroundColor: "white" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen name="Home">
        {(props) => <StackNav {...props} user={user} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default MyDrawer;
