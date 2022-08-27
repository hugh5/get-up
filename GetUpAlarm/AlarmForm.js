import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {useForm, Controller} from 'react-hook-form';
import {connect} from 'react-redux';
import {addAlarm, deleteAlarm} from './actions/alarms';
import ModalDropdown from 'react-native-modal-dropdown';
import RadioGroup from 'react-native-radio-buttons-group';
import {setAlarm, cancelAlarm} from 'react-native-alarm-module';
import Alarm from 'react-native-alarm-manager';

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

  function makeid() {
    let length = 5;
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function submit(data) {
    console.log(data);
  }

  const onSubmit = data => {
    let alarmProps = {};
    alarmProps.name = data.name;
    const selectedStopOption = data.stopOption.findIndex(
      option => option.selected === true,
    );
    alarmProps.stopOption = data.stopOption[selectedStopOption].value;
    data.time.setMinutes(
      data.time.getMinutes() - data.time.getTimezoneOffset(),
    );
    alarmProps.time = data.time;
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset(),
    );
    setTimeout(triggerAlarm, alarmProps.time - currentDate);
  };

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
        rules={{required: true}}
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    add: alarmNotifObj => {
      dispatch(deleteAlarm(alarmNotifObj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmForm);
