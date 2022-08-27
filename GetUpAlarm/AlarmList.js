import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

function AlarmList({navigation}) {
  return (
    <View
      style={{flex: 1, color: 'black', textSize: 20, justifyContent: 'center'}}>
      <Text>Alarm 1</Text>
      <Text>Alarm 2</Text>
    </View>
  );
}

export default AlarmList;
