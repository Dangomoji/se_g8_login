import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/home';
import SettingScreen from '../screens/setting';
import {Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                HeaderStyle: {
                    backgroundColor: '#f4511e'
                },
                headerTintColor: '#fff',
                headerTitleStyle:{
                    fontWeight: 'bold'
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon:({color}) => {
                    let iconName
                    if (route.name == 'Home') {
                        iconName ='home'
                    }
                    else if(route.name == 'Settings') {
                        iconName = 'settings-sharp'
                    }
                    return <Ionicons name = {iconName} size={25} />
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'หน้าหลัก'
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    title: 'หน้าหลัก'
                }}
            />

        </Tab.Navigator>
    );
}