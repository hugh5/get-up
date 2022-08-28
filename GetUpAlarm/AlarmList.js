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

  useEffect(() => {
    async function getAlarms() {
      let alarmDisplayPartial = [];
      const data = await importData();
      setAlarms(data);
      console.log('empty display', alarmDisplayPartial);
      console.log('alarms', alarms);
      alarms.forEach(element => {
        const elementObj = JSON.parse(element[1]);
        alarmDisplayPartial.push([
          <Text style={styles.alarm} key={elementObj.name}>
            {elementObj.name + ' , ' + elementObj.time.slice(11, 16)}
          </Text>,
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
    fontSize: 50,
    borderColor: 'black',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default AlarmList;
