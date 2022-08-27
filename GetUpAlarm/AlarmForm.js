import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {useForm, Controller} from 'react-hook-form';
import RadioGroup from 'react-native-radio-buttons-group';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import SoundPlayer from 'react-native-sound-player';

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

const AlarmForm = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [alarms, setAlarms] = useState([]);

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

  // const createAlarm = () => {
  //   AlarmModuleTest.createAlarmEvent('testName', 'testLocation');
  // };

  function onSubmit(data) {
    //Initialise alarm object with name, time, stop option
    //and active status
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
    alarmProps.active = true;
    console.log(
      'Alarm created. Name ' +
        alarmProps.name +
        ', Stop option ' +
        alarmProps.stopOption +
        ', Time ' +
        alarmProps.time,
    );
    ToastAndroid.show(
      'Alarm created for ' + alarmProps.name + ' at ' + alarmProps.time,
      ToastAndroid.SHORT,
    );
    console.log(alarms);

    //Adds new alarm to array of alarms
    setAlarms([...alarms, alarmProps]);

    //Creates callback function to be triggered at time of alarm
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset(),
    );

    setTimeout(triggerAlarm, alarmProps.time - currentDate);
  }

  //Plays sound until nfc tag is scanned
  async function triggerAlarm() {
    console.log('set alarm');
    let _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        console.log('looping sound');
        SoundPlayer.playSoundFile('alarm', 'mp3');
      },
    );
    console.log('playing sound');
    SoundPlayer.playSoundFile('alarm', 'mp3');
    console.log('initialising nfc reader');

    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.log('alarm disabled', tag);
      _onFinishedPlayingSubscription.remove();
      SoundPlayer.stop();
      console.log('sound stopped');
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      console.log('closing nfc reader');
      NfcManager.cancelTechnologyRequest();
      console.log('closed nfc reader');
    }
    // NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
    //   console.log('alarm disabled');
    //   SoundPlayer.stop();
    // });
    // await NfcManager.registerTagEvent();
  }

  //Renders alarm creation form with controller to fetch data
  //on submit
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
            textColor="#000000"
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
            style={styles.field}
          />
        )}
        name="stopOption"
      />
      <Button
        title="create"
        style={styles.input}
        onPress={handleSubmit(onSubmit)}
      />
      <Button
        title="Cancel"
        style={styles.input}
        onPress={() => navigation.navigate('Alarms')}
      />
    </View>
  );
};

//Styles
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    textAlign: 'center',
    flex: 1,
    color: 'black',
  },
  field: {
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
    color: 'black',
  },
  input: {
    margin: 30,
    width: 200,
    borderColor: 'purple',
    color: 'black',
  },
});

export default AlarmForm;
