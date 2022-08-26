import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const AlarmForm = () => {
  return (
    <View>
      <TextInput style={styles.field} placeholder="Enter alarm stuff" />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderWidth: 2,
    borderColor: 'skyblue',
    margin: 20,
  },
});

export default AlarmForm;
