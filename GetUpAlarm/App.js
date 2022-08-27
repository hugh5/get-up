import {Text, View, StyleSheet, Button} from 'react-native';
import React, {Component, useState} from 'react';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

import AlarmForm from './AlarmForm';
import AlarmList from './AlarmList';
import StandardTask from './Tasks/StandardTask';
import NfcTask from './Tasks/NfcTask';
import MemoryTask from './Tasks/MemoryTask';
import CreditCardTask from './Tasks/CreditCardTask.js';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

NfcManager.start();

const Stack = createNativeStackNavigator();

export function App() {
  const [showForm, setShowForm] = useState(false);
  const Alarms = [];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Alarms">
        <Stack.Screen name="Set Alarms" component={AlarmForm} />
        <Stack.Screen name="Alarms" component={AlarmList} />
        <Stack.Screen name="Standard Alarm" component={StandardTask} />
        <Stack.Screen name="NFC Alarm" component={NfcTask} />
        <Stack.Screen name="Payment Alarm" component={CreditCardTask} />
        <Stack.Screen name="Memory Alarm" component={MemoryTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
