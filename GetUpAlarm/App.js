import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import React, {Component, useState} from 'react';
import NewAlarmButton from './NewAlarmButton';
import AlarmForm from './AlarmForm';
import AlarmList from './AlarmList'

export function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Alarm</Text>
      <AlarmForm />
      <SafeAreaView style={styles.alarmList}>
        <ListAlarms />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    padding: 20,
  },
  alarmList: {
    flex: 1,
    width: 100,
  },

});

export default App;
