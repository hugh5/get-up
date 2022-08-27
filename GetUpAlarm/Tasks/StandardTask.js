import React from 'react';
import {View, Text, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function StandardTask(props, {navigation}) {
  return (
    <View>
      <Button
        title="Scan a card with NFC to turn your alarm off!"
        onPress={() => props.onPress()}
      />
    </View>
  );
}

export default StandardTask;
