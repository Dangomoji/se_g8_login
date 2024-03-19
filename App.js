import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from "./authContext";
import HomeScreen from './screens/home';
import MyTabs from './tabs/mytab';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <MyTabs /> : <HomeScreen />}
    </NavigationContainer>
  );
}
