import { StyleSheet, Button, Text, View, ScrollView, Alert } from 'react-native';
import React , { useState, useEffect } from 'react';
import { useAuth } from "../authContext";
import UserHeader from "./userHeader";

export default function RequestExtraWorkScreen() {
    const { user } = useAuth();
    const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      const response = await fetch('http://192.168.204.148:2000/se/nurse/schedule/request');
      const data = await response.json();
      mapData(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const mapData = (data) => {
    const mappedData = data.map(item => {
      return {
        ...item,
        date: formatDate(item.date),
      };
    });
    setRequestData(mappedData);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleRequestAction = async (itemId, statusExtraId) => {
    try {
      const response = await fetch(`http://192.168.204.148:2000/se/requestextrawork/update/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusExtraId }),
      });
      console.log(response.ok)
        if (response.ok) {
        fetchScheduleData(); 
      } else {
        console.error('Failed to update StatusExtraId');
      }
    } catch (error) {
      console.error('Error updating StatusExtraId:', error);
    }
  };
  

  const handleAcceptRequest = async (itemId) => {
    try {
      Alert.alert(
        'Confirm',
        'ยืนยันการรับทราบ?',
        [
          {
            text: 'ตกลง',
            onPress: async () => {
              await handleRequestAction(itemId, 1);
            },
          },
          {
            text: 'ยกเลิก',
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };
  

  const renderRequestData = () => {
    if (!requestData || requestData.length === 0) {
      return <Text>ไม่มีประวัติการขอขึ้นเวรฉุกเฉิน</Text>;
    } else {
      return requestData.map((item, index) => (
        <View style={styles.from} key={index}>
          <View style={styles.massage}>
            <Text>ผู้ที่ถูกเรียกมาขึ้นเวร: {item.firstname}a {item.lastname}{'\n'}</Text>
            <Text>วันที่: {item.date}{'\n'}</Text>
            <Text>เวรที่ต้องการคน: {item.shift} {'\n'}</Text>
          </View>
          <View style={styles.button}>
            <Button title="รับทราบ" onPress={() => handleAcceptRequest(item.requestID)} color='#53F41B' />
          </View>
        </View>
      ));
    }
  };


  return (
    <View style={styles.container}>
      <UserHeader user={user} />
      <View style={styles.main}>
        <View style={styles.head}>
          <Text>คำร้องขอการอนุมัติขึ้นเวรฉุกเฉิน</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {renderRequestData()}
        </ScrollView>
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
    height:250,
    width:350,
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    marginBottom: 10,
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
