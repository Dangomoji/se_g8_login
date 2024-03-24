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
  const { user , isLogin } = useAuth();

  return (
    <NavigationContainer>
      {isLogin ? <AuthenticatedContent user={user}/> : <LoginScreen />}
    </NavigationContainer>
  );
}

function AuthenticatedContent(user) {
  return (
    <MyTabs user={user}/>
  );
}
