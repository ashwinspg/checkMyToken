import { FETCH_USER } from '../actions/types';

const initialState = {
    data: null,
    loaded: false
};

export default function authReducer (state = initialState, action){
    switch(action.type){
        case FETCH_USER:
            const newState = { ...state };
            newState.data = action.payload || false;
            newState.loaded = true;
            return newState;
        default:
            return state;
    }
}