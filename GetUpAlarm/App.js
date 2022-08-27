import {Text, View, StyleSheet} from 'react-native';
import React, {Component, useState} from 'react';
import NewAlarmButton from './NewAlarmButton';
import AlarmForm from './AlarmForm';
import MyStack from './TaskScreen';

export function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Alarm</Text>
      <AlarmForm />
      <Text>MyStack</Text>
      <MyStack />
    </View>
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
