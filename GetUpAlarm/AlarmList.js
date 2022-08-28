import React, {useState} from 'react';
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

var print_list = [];

for (let i = 0; i < 10; i++) {
  print_list.push(
    <View key={i}>
      <Text style={{textAlign: 'left', marginTop: 5}}>{i}</Text>
    </View>,
  );
}

function AlarmList({navigation}) {
  importData = async () => {
    try {
      await AsyncStorage.clear();
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log(result);
      return result.map(req => JSON.parse(req));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    importData();
  }, []);

  const alarms = importData();
  console.log(alarms);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{print_list}</ScrollView>
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
