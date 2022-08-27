import React from 'react';
import {View, Text, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import SoundPlayer from 'react-native-sound-player';

const StandardTask = ({navigation}) => {
  return (
    <View>
      <Button
        title="Scan a card with NFC to turn your alarm off!"
        onPress={() => navigation.navigate('Alarms')}
      />
    </View>
  );
};

const NfcTask = ({navigation}) => {
  return (
    <View>
      <Button
        title="Tap to scan a card with NFC to turn your alarm off!"
        onPress={() => navigation.navigate('Alarms')}
      />
    </View>
  );
};

const MemoryTask = ({navigation}) => {
  return (
    <View>
      <Button
        title="Scan a card with NFC to turn your alarm off!"
        onPress={() => navigation.navigate('Alarms')}
      />
    </View>
  );
};

const CreditCardTask = ({navigation}) => {
  return (
    <View>
      <Button
        title="Scan a card with NFC to turn your alarm off!"
        onPress={() => navigation.navigate('Alarms')}
      />
    </View>
  );
};

export {StandardTask, NfcTask, CreditCardTask, MemoryTask};
