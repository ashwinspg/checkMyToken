import axios from 'axios';
import {FETCH_USER, FETCH_DOCTORS} from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const createHospital = (formValues, history) => async dispatch => {
    const res = await axios.post('/api/hospital', formValues);
    
    history.push('/hospital/doctors');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const createDoctor = (formValues, history) => async dispatch => {
    const res = await axios.post('/api/hospital/doctors', formValues);

    history.push('/hospital/doctors');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchDoctors = () => async dispatch => {
    const res = await axios.get('/api/hospital/doctors');

    dispatch({ type: FETCH_DOCTORS, payload: res.data });
}