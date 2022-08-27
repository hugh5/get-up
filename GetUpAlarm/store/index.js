import { configureStore, combineReducers } from 'redux';

import alarmReducer from '../reducers/alarmReducer';

const rootReducer = combineReducers({
    alarms: alarmReducer,
});
const makeStore = () => {
    return configureStore(rootReducer)
}

export default makeStore;
