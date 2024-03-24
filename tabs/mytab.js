import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../authContext";

import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/profile';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
      <Text style={{ fontSize: 20 }}>Menu</Text>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const navigation = useNavigation();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
  };

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} handleLogout={handleLogout} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <CustomHeader {...props} />
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Logout"
        onPress={props.handleLogout} 
      />
    </DrawerContentScrollView>
  );
};

export default MyDrawer;
