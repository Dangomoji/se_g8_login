import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/home';
import SettingScreen from '../screens/setting';

const Drawer = createDrawerNavigator();

export default function MyTabs() {
    return (
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Setting" component={SettingScreen} />
          </Drawer.Navigator>
      );
}