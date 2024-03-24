import { Text, View, StyleSheet,Button } from 'react-native';
import React from 'react';
import { useAuth } from "../authContext";

export default function RequestExtraWorkScreen() {
    const { user } = useAuth();
    const _onPressButton1 = () => {
        alert('Sucess')
      }
      return (
        <View style={styles.container}>
          <View style={styles.name}>
            <Text style={styles.text}>หัวหน้าพยาบาล แพรวพราว ไก่ทอดี</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.head}>
              <Text>คำร้องขอการอนุมัติขึ้นเวรฉุกเฉิน</Text>
            </View>
            <View style={styles.from}>
              <View style={styles.massage}>
                <Text>ผู้ขอทำการเรียก:  {user.firstname}{'\n'}</Text> 
                <Text>ผู้ที่ถูกเรียกมาขึ้นเวร: {'\n'}</Text> 
                <Text>วันที่: {'\n'}</Text>
                <Text>เวรที่ต้องการคน: {'\n'}</Text>
                </View>
                <View style={styles.button}>
                  <Button
                  title="รับทราบ"
                  onPress={(_onPressButton1)}
                  color ='#53F41B'
                  />
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
    backgroundColor: '#DCDCDC',
    marginLeft: 30,
    marginTop: 40,
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
