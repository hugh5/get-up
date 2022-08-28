import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function AlarmList({navigation}) {
  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const alarms = await importData;
  console.log(alarms);

  return (
    <View>
      <View style={styles.top}>
        <Text>Hello</Text>
      </View>
      <Button
        style={styles.container}
        title="New Alarm"
        onPress={() => navigation.navigate('Set Alarms')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    minHeight: 568,
    maxHeight: 568,
  },
  container: {
    height: 10,
    marginTop: 500,
  },
});

export default AlarmList;
