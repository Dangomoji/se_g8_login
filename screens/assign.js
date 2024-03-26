import { StyleSheet, Button, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import UserHeader from "./userHeader";
import { useAuth } from "../authContext";

export default function AssignScreen() {
  const { user } = useAuth();
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      const response = await fetch('http://10.40.158.122:2000/se/nurse/schedule');
      const data = await response.json();
      formatDates(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDates = (data) => {
    const formattedData = data.map(item => {
      return {
        ...item,
        date1: formatDate(item.schedule_date),
        date2: formatDate(item.schedule_date2)
      };
    });
    setRequestData(formattedData);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleRequestAction = async (itemId, statusAssignId) => {
    try {
      const response = await fetch(`http://10.40.158.122:2000/se/update/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusAssignId }),
      });
  
      if (response.ok) {
        fetchScheduleData(); 
        console.log('StatusAssignId updated successfully');
      } else {
        console.error('Failed to update StatusAssignId');
      }
    } catch (error) {
      console.error('Error updating StatusAssignId:', error);
    }
  };
  
  const handleAcceptRequest = async (itemId) => {
    try {
      await handleRequestAction(itemId, 1);
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };
  
  const handleRejectRequest = async (itemId) => {
    try {
      await handleRequestAction(itemId, 2); 
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };
  

  

  const renderRequestData = () => {
    if (requestData) {
      return requestData.map((item, index) => (
        <View style={styles.from} key={index}>
          <View style={styles.massage}>
            <Text>ผู้ขอแลกเวร: {item.firstname} {item.lastname}{'\n'}</Text>
            <Text>เวรที่ขอแลก: {item.shift} - {item.date1}{'\n'}</Text>
            <Text>เวรที่นำมาแลก: {item.shift2} - {item.date2}{'\n'}</Text>
          </View>
          <View style={styles.button}>
            <Button title="ตกลง" onPress={() => handleAcceptRequest(item.assignID)} color='#53F41B' />
            <View style={styles.marginbutton} />
            <Button title="ปฏิเสธ" onPress={() => handleRejectRequest(item.assignID)} color='#F41B1B' />
          </View>
        </View>
      ));
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  };


  return (
    <View style={styles.container}>
      <UserHeader user={user} />
      <View style={styles.main}>
        <View style={styles.head}>
          <Text>คำร้องขอแลกเวร</Text>
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
  scrollViewContainer: {
    alignItems: 'center'
  },
  from: {
    height: 300,
    width: 350,
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
