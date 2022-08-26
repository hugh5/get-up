import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {useForm, Controller} from 'react-hook-form';
import ModalDropdown from 'react-native-modal-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Standard',
    value: 'standard',
  },
  {
    id: '2',
    label: 'NFC',
    value: 'nfc',
  },
  {
    id: '3',
    label: 'Payment',
    value: 'payment',
  },
  {
    id: '4',
    label: 'Memory',
    value: 'memory',
  },
];

const AlarmForm = () => {
  const [date, setDate] = useState(new Date());
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      time: new Date(),
      stopOption: null,
    },
  });
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{required: true}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.field}
            placeholder="Name"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
        name="name"
      />
      {errors.name && <Text>required.</Text>}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <DatePicker
            textColor="#ffffff"
            date={date}
            value={value}
            onDateChange={onChange}
            onBlur={onBlur}
            mode="time"
            androidVariant="nativeAndroid"
            fadeToColor="none"
          />
        )}
        name="time"
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onChange}
            value={value}
            onBlur={onBlur}
          />
        )}
        name="stopOption"
      />
      <Button
        title="create"
        style={styles.input}
        onPress={handleSubmit(onSubmit)}
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
