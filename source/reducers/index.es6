import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer.es6';
import baseReducer from './baseReducer.es6';
import homeReducer from './homeReducer.es6';
import patientDetailsReducer from './patientDetailsReducer.es6';
import indexPageReducer from './indexPageReducer.es6';
import insuranceReducer from './insuranceReducer.es6';
import atFaultReducer from './atFaultReducer.es6';
import attorneyReducer from './attorneyReducer.es6';
import popupReducer from './popupReducer.es6';
import employeeReducer from './employeeReducer.es6';
import paymentReducer from './paymentReducer.es6';
import searchReducer from './searchReducer.es6';
const rootReducer = combineReducers({
    authReducer,
    baseReducer,
    indexPageReducer,
    homeReducer,
    patientDetailsReducer,
    insuranceReducer,
    atFaultReducer,
    attorneyReducer,
    popupReducer,
    employeeReducer,
    paymentReducer,
    searchReducer,
    form: formReducer
});

export default rootReducer;
