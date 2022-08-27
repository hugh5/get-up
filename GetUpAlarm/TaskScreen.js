import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Goodbye" component={GoodbyeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Hello"
      onPress={() => navigation.navigate('Profile', {name: 'Bob'})}
      style={styles.container}
    />
  );
};

const GoodbyeScreen = ({navigation, route}) => {
  return (
    <Text style={styles.container}>This is goodbye, {route.params.name}.</Text>
  );
};

export default MyStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'baseline',
  },
});
