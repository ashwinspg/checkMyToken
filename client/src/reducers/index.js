import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import headerReducer from './headerReducer';
import authReducer from './authReducer';
import doctorsReducer from './doctorsReducer';
import doctorStatusReducer from './doctorStatusReducer';

export default combineReducers({
    header: headerReducer,
    auth: authReducer,
    form: reduxForm,
    doctors: doctorsReducer,
    doctorStatus: doctorStatusReducer
});