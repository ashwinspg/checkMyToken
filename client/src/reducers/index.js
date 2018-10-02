import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import doctorsReducer from './doctorsReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    doctors: doctorsReducer
});