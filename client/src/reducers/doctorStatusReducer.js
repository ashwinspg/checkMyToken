import { FETCH_DOCTOR_STATUS, DOCTOR_STATUS_RESET } from '../actions/types';

const initialState = {
    data: null,
    loaded: false
};

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_DOCTOR_STATUS:
            const newState = {};
            newState.data = action.payload;
            newState.loaded = true;
            return newState;
        case DOCTOR_STATUS_RESET:
            return initialState;
        default:
            return state;
    }
}