import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';

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

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      time: new Date(),
      stopOption: 'standard',
    },
  });

  function submit(data) {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        rules={{required: true}}
        render={({onChange, value}) => (
          <TextInput style={styles.field} placeholder="Name" value={value} />
        )}
      />
      {errors.name && <Text>required.</Text>}
      <Controller
        control={control}
        name="time"
        render={({onChange, value}) => (
          <DatePicker
            textColor="#ffffff"
            date={date}
            onDateChange={setDate}
            mode="time"
            androidVariant="nativeAndroid"
            fadeToColor="none"
          />
        )}
      />
      <Controller
        control={control}
        name="stopOption"
        render={({onChange, value}) => (
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.input}
          />
        )}
      />
      <Button
        title="create"
        style={styles.input}
        onPress={() => handleSubmit(submit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    textAlign: 'center',
    flex: 1,
    color: 'white',
  },
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
