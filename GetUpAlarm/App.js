import {Text, View, StyleSheet, Button} from 'react-native';
import React, {Component, useState} from 'react';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

import AlarmForm from './AlarmForm';
// import MyStack from './TaskScreen';
import AlarmList from './AlarmList';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskScreen from './TaskScreen';

NfcManager.start();

const Stack = createNativeStackNavigator();

export function App() {
  const [showForm, setShowForm] = useState(false);
  const Alarms = [];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Alarms">
        <Stack.Screen name="Set Alarms" component={AlarmForm} />
        <Stack.Screen name="Task" component={TaskScreen} />
        <Stack.Screen name="Alarms" component={AlarmList} />
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
