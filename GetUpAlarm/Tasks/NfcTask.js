import React from 'react';
import {View, Text, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

export default NfcTask;