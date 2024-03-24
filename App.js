import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from "./authContext";
import LoginScreen from './screens/login';
import MyTabs from './tabs/mytab';

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isLogin } = useAuth();

  return (
    <NavigationContainer>
      {isLogin ? <AuthenticatedContent/> : <LoginScreen />}
    </NavigationContainer>
  );
}

function AuthenticatedContent() {
  return (
    <MyTabs/>
  );
}
