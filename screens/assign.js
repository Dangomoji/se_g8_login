import { StyleSheet,Button,Text, View } from 'react-native';
import React from 'react';
import UserHeader from "./userHeader";
import { useAuth } from "../authContext";

export default function AssignScreen() {
  const { user } = useAuth();
  const _onPressButton1 = () => {
    alert('ยอมรับการแลกเวรสำเร็จ')
  }
  const _onPressButton2 = () => {
    alert('ปฏิเสธการแลกเวรสำเร็จ')
  }
  return (
    <View style={styles.container}>
      <UserHeader user={user}/>
      <View style={styles.main}>
        <View style={styles.head}>
          <Text>คำร้องขอแลกเวร</Text>
        </View>
        <View style={styles.from}>
          <View style={styles.massage}>
            <Text>ผู้ขอแลกเวร: {'\n'}</Text> 
            <Text>เวรที่ขอแลก: {'\n'}</Text> 
            <Text>เวรที่นำมาแลก: {'\n'}</Text>
            </View>
            <View style={styles.button}>
              <Button title="ตกลง" onPress={(_onPressButton1)} color ='#53F41B'/>
              <View style={styles.marginbutton} />
              <Button title="ปฏิเสธ" onPress={(_onPressButton2)} color = '#F41B1B' />
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  name: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  main: {
    flex: 16,
    alignItems: 'center'
  },
  from: {
    height:300,
    width:350,
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
  },
  head: {
    height: 30,
    width: 400,
    alignItems: 'center',
    margin: 20,
  },
  massage: {
    flex: 1,
    marginLeft: 30,
    marginTop: 40,
    backgroundColor: '#DCDCDC',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  marginbutton: {
    width: 10, 
    backgroundColor: '#DCDCDC',
  },
});
