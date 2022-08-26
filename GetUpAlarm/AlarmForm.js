import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const AlarmForm = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
    setShow('true');
  };
  return (
    <View>
      <TextInput style={styles.field} placeholder="Enter alarm stuff" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
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
