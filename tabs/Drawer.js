import React from "react";
import { TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerActions,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../authContext";
import Icon from "react-native-vector-icons/Entypo";

import HomeScreen from "../screens/home";
import RequestExtraWorkScreen from "../screens/requestExtraWork";
import AssignScreen from "../screens/assign";
import DrawerContent from "./DrawerContent";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: "black",
        headerStyle: {
          backgroundColor: "grey",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => console.log("Pressed")}>
            <Icon name="bell" size={30} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
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
  const { logout } = useAuth();
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
