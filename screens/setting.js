import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../authContext';

const SettingScreen = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome, {user.firstname} {user.lastname}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#000000',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SettingScreen;
