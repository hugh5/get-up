import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TaskScreen = ({navigation}) => {
  return (
    <View>
<<<<<<< HEAD
=======
      <Text>Hello</Text>
>>>>>>> 1c73fdb3bdeb33c8efc0630aaa9095bd7b3d3bb8
      <Button
        title="New Alarm"
        onPress={() => navigation.navigate('Set Alarms')}
      />
    </View>
  );
};

export default TaskScreen;
