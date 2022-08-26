import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const AlarmForm = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [showDate, setShowDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [items, setItems] = useState([
    {label: 'Standard', value: 'standard'},
    {label: 'NFC', value: 'nfc'},
    {label: 'Payment', value: 'payment'},
    {label: 'Memory', value: 'memory'},
  ]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShowDate(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
    setShowDate('true');
  };
  return (
    <View>
      <TextInput style={styles.field} placeholder="Name" />
      <Button
        onPress={showTimepicker}
        title="Select Time"
        style={styles.input}
      />
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          style={styles.input}
        />
      )}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.input}
      />
      <Button title="create" style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
  },
  input: {
    margin: 30,
    width: 200,
    borderColor: 'purple',
  },
});

export default AlarmForm;
