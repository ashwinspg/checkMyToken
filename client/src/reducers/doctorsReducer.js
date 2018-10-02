import { FETCH_DOCTORS } from '../actions/types';

const initialState = {
    data: [],
    loaded: false
};

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_DOCTORS:
            const newState = {};
            newState.data = action.payload;
            newState.loaded = true;
            return newState;
        default:
            return state;
    }
}