import React from 'react';
import {View, Text, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TaskScreen = ({navigation}) => {
  return (
    <View>
      <Text>Hello</Text>
      <Button
        title="New Alarm"
        onPress={() => navigation.navigate('Set Alarms')}
      />
    </View>
  );
};

export default TaskScreen;
