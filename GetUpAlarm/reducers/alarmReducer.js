import {ADD_ALARM, DELETE_ALARM } from '../actions/index';
import Moment from 'moment';

const initialState = {
    alarms: [],
};

const alarmReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALARM:
            Moment.locale('en');
            console.log("time", state);
            const payload = action.payload;
            const time = Moment(payload.data.value).format("hh:mm A");
            const date = Moment(payload.data.value).format("d/m/YY");
            console.log(time);
            const alarm = {
                alarmmNotifications: payload,
                value: payload.data,
                time: time,
                date: date,
            };
            return {
                ...state,
                alarms: state.alarms.concat(alarm)
            };
        case DELETE_ALARM:
            return {
                ...state,
                alarms: state.alarms.filter(v => {
                    return v.value !== action.payload;
                }),
            };

        default:
            return state;
    }
}

export default alarmReducer;