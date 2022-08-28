import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AlarmList({navigation}) {
  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log('keys length', keys.length);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const [alarms, setAlarms] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alarmDisplay, setAlarmDisplay] = useState([]);
  useEffect(() => {
    setLoaded(false);
  });

  function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function format_time(string) {
    let x = parseInt(string.slice(0, 2));
    if (x > 12) {
      console.log('time', x);
      return x - 12 + string.slice(2, 5) + ' pm';
    } else {
      return string + ' am';
    }
  }

  useEffect(() => {
    async function getAlarms() {
      let alarmDisplayPartial = [];
      const data = await importData();
      setAlarms(data);
      console.log('empty display', alarmDisplayPartial);
      console.log('alarms', alarms);
      console.log('data', data);
      alarms.forEach(element => {
        console.log('element', element);
        const elementObj = JSON.parse(element[1]);
        alarmDisplayPartial.push([
          <View style={styles.alarm}>
            <Text style={styles.time} key={elementObj.name}>
              {format_time(elementObj.time.slice(11, 16))}
            </Text>
            <Text style={styles.info}>
              {elementObj.name + ' - ' + cap(elementObj.stopOption)}
            </Text>
          </View>,
        ]);
      });
      setAlarmDisplay(alarmDisplayPartial);
      console.log('display', alarmDisplay);
      setLoaded(true);
    }

    getAlarms();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{alarmDisplay}</ScrollView>
      <Button
        title="New Alarm"
        onPress={() => navigation.navigate('Set Alarms')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alarm: {
    borderColor: 'black',
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
    borderWidth: 2,
    marginBottom: 10,
  },
  info: {
    fontSize: 20,
  },
  time: {
    fontSize: 30,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default AlarmList;
