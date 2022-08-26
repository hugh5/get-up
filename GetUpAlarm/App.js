import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import NewAlarmButton from './NewAlarmButton';
import AlarmForm from './AlarmForm';

export function App() {
  return (
    <View style={styles.container}>
      <Text>Alarm</Text>
      <AlarmForm />
      <NewAlarmButton />
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
