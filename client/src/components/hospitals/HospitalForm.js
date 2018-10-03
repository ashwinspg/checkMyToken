import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import formFields from './formFields';
import HospitalFormField from './HospitalFormField';
import Modal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../actions';

class HospitalForm extends Component{
    state = {
        showSpinner: false
    }

    renderField(){
        return _.map(formFields, ({label, name}) => {
            return <Field 
                key={name}
                component={HospitalFormField}
                type="text"
                label={label}
                name={name}
            />
        });
    }

    submitHandler(formValues){
        this.setState({
            ...this.state,
            showSpinner: true
        });
        this.props.createHospital(formValues, this.props.history);
    }

    render(){
        return (
            <div>
                {this.state.showSpinner ? 
                    (<Modal show="true">
                        <Spinner />
                    </Modal>) :
                    null
                }
                <form 
                    onSubmit = {this.props.handleSubmit((formValues) => {this.submitHandler(formValues);})}
                >
                    {this.renderField()}
                    <button type="submit" className="teal btn-flat right white-text">
                        Submit
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    _.each(formFields, ({ name }) => {
        if(!values[name]){
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default connect(null, actions)(reduxForm({
    validate,
    form: 'hospitalForm'
})(HospitalForm));