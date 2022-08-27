import React from 'react';
<<<<<<< HEAD
import {View, Text, Button, StyleSheet} from 'react-native';
=======
import {StyleSheet, View, Text, Button} from 'react-native';
>>>>>>> 9872b5012a3d66a284bf3ee8c0337a3756f72e04

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TaskScreen = ({navigation}) => {
  return (
    <View>
<<<<<<< HEAD
=======
      <View style={styles.top}>
        <Text>Hello</Text>
      </View>
>>>>>>> 9872b5012a3d66a284bf3ee8c0337a3756f72e04
      <Button
        title="New Alarm"
        onPress={() => navigation.navigate('Set Alarms')}
      />
    </View>
  );
};

export default TaskScreen;
