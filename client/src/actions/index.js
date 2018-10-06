import axios from 'axios';
import * as actions from './types';

export const showLoader = () => ({
    type: actions.SHOW_LOADER
});

export const hideLoader = () => ({
    type: actions.HIDE_LOADER
});

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: actions.FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    dispatch(showLoader());
    const res = await axios.post('/api/stripe', token);
    dispatch(hideLoader());

    dispatch({ type: actions.FETCH_USER, payload: res.data });
};

export const createHospital = (formValues, history) => async dispatch => {
    dispatch(showLoader());
    const res = await axios.post('/api/hospital', formValues);
    dispatch(hideLoader());

    history.push('/hospital/doctors');
    dispatch({ type: actions.FETCH_USER, payload: res.data });
};

export const createDoctor = (formValues, history) => async dispatch => {
    dispatch(showLoader());
    const res = await axios.post('/api/hospital/doctors', formValues);
    dispatch(hideLoader());

    history.push('/hospital/doctors');
    dispatch({ type: actions.FETCH_USER, payload: res.data });
};

export const fetchDoctors = () => async dispatch => {
    dispatch(showLoader());
    const res = await axios.get('/api/hospital/doctors');
    dispatch(hideLoader());

    dispatch({ type: actions.FETCH_DOCTORS, payload: res.data });
}

export const fetchDoctorStatus = (url) => async dispatch => {
    dispatch(showLoader());
    const res = await axios.get("/api" + url);
    dispatch(hideLoader());

    dispatch({ type: actions.FETCH_DOCTOR_STATUS, payload: res.data });
}

export const updateDoctorStatus = (url, formValues, resetCallback) => async dispatch => {
    dispatch(showLoader());
    const res = await axios.post("/api" + url, formValues);
    dispatch(hideLoader());

    resetCallback();
    dispatch({ type: actions.FETCH_DOCTOR_STATUS, payload: res.data });
}

export const doctorStatusReset = () => ({
    type: actions.DOCTOR_STATUS_RESET
});