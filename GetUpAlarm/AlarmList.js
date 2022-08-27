import React, { Component } from 'react';
import { Button, StyleSheet, FlatList, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const AlarmList = (props) => {
    let keyExtractor = (item, index) => index.toString();
    let renderItem = ({ item }) => (
    <View style={styles.container}>
      <ListItem
        title={item.time.toString()}
        titleStyle={styles.titleStyle}
        subtitle={item.date.toString()}
        bottomDivider
      />
    </View>
    );
    return (
        <FlatList
            keyExtractor={keyExtractor}
            data={props.alarms}
            renderItem={renderItem}
        />
    );
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