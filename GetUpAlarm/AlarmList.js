import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

function AlarmList({navigation}) {
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
}

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

export default AlarmList;
