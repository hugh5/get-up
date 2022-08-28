import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AlarmList({navigation}) {
  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const [alarms, setAlarms] = useState();

  useEffect(() => {
    console.log('getting data');
    importData().then(response => setAlarms(response));
  }, []);

  importData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{}</ScrollView>
      <Button
        title="New Alarm"
        onPress={() => navigation.navigate('Set Alarms')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
