import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import {useForm, Controller} from 'react-hook-form';
import RadioGroup from 'react-native-radio-buttons-group';
import AlarmModuleTest from './AlarmModuleTest';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import SoundPlayer from 'react-native-sound-player';

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Standard',
    value: 'standard',
  },
  {
    id: '2',
    label: 'Memory',
    value: 'memory',
  },
  {
    id: '3',
    label: 'Payment',
    value: 'payment',
  },
];

const AlarmForm = () => {
  const [date, setDate] = useState(new Date());
  const [hasNfc, setHasNfc] = useState(null);

  React.useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
      }
      setHasNfc(supported);
    }

    checkNfc();
  }, []);

  // if (hasNfc) {
  //   radioButtonsData.push({
  //     id: '4',
  //     label: 'NFC',
  //     value: 'nfc',
  //   });
  // }

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

  const createAlarm = () => {
    AlarmModuleTest.createAlarmEvent('testName', 'testLocation');
  };

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

  async function triggerAlarm() {
    _onFinishedPlayingSubscription = null;
    let disabled = false;
    console.log('set alarm');
    _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        SoundPlayer.playSoundFile('alarm', 'mp3');
      },
    );
    SoundPlayer.playSoundFile('alarm', 'mp3');
    NfcManager.addEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('alarm disabled');
      disabled = true;
    });

    // NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
    //   disabled = true;
    //   console.log('alarm disabled');
    // });
    // await NfcManager.registerTagEvent();
    //while (!disabled) {

    //}
  }

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

export default AlarmForm;
