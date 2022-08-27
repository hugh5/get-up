import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const TaskScreen = ({navigation}) => {
  return (
    <View>
      <View style={styles.top}>
        <Text>Hello</Text>
      </View>
      <Button
        style={styles.container}
        title="New Alarm"
        onPress={() => navigation.navigate('Set Alarms')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    minHeight: 568,
    maxHeight: 568,
  },
  container: {
    height: 10,
    marginTop: 500,
  },
});

export default TaskScreen;
