import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import headerReducer from './headerReducer';
import authReducer from './authReducer';
import doctorsReducer from './doctorsReducer';
import doctorStatusReducer from './doctorStatusReducer';

export default combineReducers({
    header: headerReducer,
    auth: authReducer,
    form: reduxFormReducer,
    doctors: doctorsReducer,
    doctorStatus: doctorStatusReducer
});