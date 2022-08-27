import React, { Component } from 'react';
import { Button, StyleSheet, FlatList, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import ReactNativeAN from 'react-native-alarm-notification';

const AlarmList = () => {
    return (
        <View>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.titleStyle}></ListItem.Title>
                    <ListItem.Subtitle>8/21/2021</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </View>

    )
 
}

const styles = StyleSheet.create({
  container: {},
  titleStyle: { fontWeight: 'bold', fontSize: 30 },
});

const mapStateToProps = state => {
  return {
    alarms: state.alarms.alarms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete: value => {
      dispatch(deleteAlarm(value));
    },
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(ListAlarms);