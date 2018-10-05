import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import formFields from './formFields';
import HospitalFormField from './HospitalFormField';
import * as validations from '../../utils/validations';
import * as actions from '../../actions';

class HospitalForm extends Component{
    renderField(){
        return _.map(formFields, ({label, name, type}) => {
            return <Field 
                key={name}
                component={HospitalFormField}
                type={type}
                label={label}
                name={name}
            />
        });
    }

    submitHandler(formValues){
        this.props.createHospital(formValues, this.props.history);
    }

    render(){
        return (
            <div>
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

    errors.contact_number = validations.validatePhoneNumber(values.contact_number || '');

    _.each(formFields, ({ name }) => {
        if(!values[name]){
            errors[name] = 'You must provide a value';
        }
    });
    console.log("errors ", errors);
    return errors;
}

export default connect(null, actions)(reduxForm({
    validate,
    form: 'hospitalForm'
})(HospitalForm));