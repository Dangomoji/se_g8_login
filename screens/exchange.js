import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ExchangeScreen extends Component {
  render() {
    const { route } = this.props;
    const { requestData } = route.params;

    return (
      <View>
        <Text>Exchange</Text>
        {requestData.map((item, index) => (
          <View style={styles.from} key={index}>
            <View style={styles.massage}>
              <Text>ผู้ขอแลกเวร: {item.firstname} {item.lastname}{'\n'}</Text>
              <Text>เวรที่ขอแลก: {item.shift} - {item.date1}{'\n'}</Text>
              <Text>เวรที่นำมาแลก: {item.shift2} - {item.date2}{'\n'}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
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
});