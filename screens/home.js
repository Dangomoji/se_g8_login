import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../authContext';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, user, isLogin } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.53.237/se_g8/login.php', {
        username: username,
        password: password
      });
      if (response.data.success) {
        login(username, password); 
        Alert.alert('Login Successful');
      } else {
        Alert.alert('Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while trying to log in');
    }
  };

  const handleLogout = () => {
    logout(); 
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      {!isLogin && (
        <>
          <Text style={{paddingBottom: 10 , fontSize: 50 , fontWeight: 'bold' }}>เข้าสู่ระบบ</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}

      {isLogin && (
        <>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome, {user.username}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
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

export default HomeScreen;
