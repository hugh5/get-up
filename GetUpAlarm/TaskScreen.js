import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import SoundPlayer from 'react-native-sound-player';

const TaskScreen = ({route, navigation}) => {
  let task = 0;
  switch (task) {
    case 1:
      return (
        <Button
          title="To alarm creator"
          onPress={() => navigation.navigate('Set Alarms')}
        />
      );
      break;
    case 2:
      return <NfcTask />;
      break;
    case 3:
      return <MemoryTask />;
      break;
    case 4:
      return <CreditCardTask />;
      break;
    default:
      return (
        <Button
          title="To alarm creator"
          onPress={() => navigation.navigate('Set Alarms')}
        />
      );
  }
};

export default TaskScreen;
