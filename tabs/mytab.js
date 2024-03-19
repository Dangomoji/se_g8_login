import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/home';
import {Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function MyTabs() {

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('loggedInUserEmail');
                            logout();
                        } catch (error) {
                            console.error('Error logging out: ', error);
                        }
                    }
                }
            ]
        );
    };

    
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
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon:({color}) => {
                    let iconName
                    if (route.name == 'Home') {
                        iconName ='home'
                    }
                    else if(route.name == 'Settings') {
                        iconName = 'settings-sharp'
                    }
                    return <Ionicons name = {iconName} color={color} size={25} />
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

        </Tab.Navigator>
    );
}