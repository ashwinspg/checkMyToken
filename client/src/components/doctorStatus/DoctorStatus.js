import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import M from 'materialize-css/dist/js/materialize.min.js';
import formFields from './formFields';
import * as fieldComponents from './DoctorStatusField';
import * as actions from '../../actions';

class DoctorStatus extends Component {
    componentDidMount(){
        this.props.fetchDoctorStatus(this.props.match.url);
    }

    componentWillUnmount(){
        this.props.doctorStatusReset();
    }

    componentDidUpdate(){
        M.FormSelect.init(document.querySelectorAll('select'), {});
    }

    copyURL(){
        var copyText = document.getElementById("searchURL");
        copyText.select();
        document.execCommand("copy");
    }

    submitHandler(formValues){
        formValues.status = formValues.status === "Active" ? true : false;
        formValues.token_number = formValues.status ? formValues.token_number : '-';
        
        this.props.updateDoctorStatus(this.props.match.url, formValues, this.props.reset);
    }

    renderField(){
        return _.map(formFields, ({label, name, type, options}) => {
            switch(type){
                case "dropdown":
                    return (
                        <Field 
                            key={name}
                            component={fieldComponents.dropDownField}
                            label={label}
                            name={name}
                        >
                            <option value="">Select the status...</option>
                            {options.map(option => (
                                <option value={option} key={option}>
                                    {option}
                                </option>
                            ))}
                        </Field>
                    );
                default:
                    if(name === "token_number" && (this.props.doctorStatusFormValues && this.props.doctorStatusFormValues.status !== "Active")){
                        return;
                    }
                    return <Field 
                        key={name}
                        component={fieldComponents.textField}
                        type="text"
                        label={label}
                        name={name}
                    />
            }
        });
    }

    renderContent() {
        if(this.props.doctorStatus.loaded){
            return (
                <div>
                    <div className="card grey lighten-5">
                        <div className="card-content">
                            <p>
                                The following URL can be used by the patients to know about the status of the token:
                            </p>
                            <textarea
                                id="searchURL"
                                className="blue-text center-align"
                                style={{ marginTop: '15px', border: '0px', outlineColor: 'transparent' }}
                                readOnly={true}
                                value={ window.location.origin + "/search/" +this.props.match.params.doctorId } 
                            />
                            <div className="center">
                                <button className="btn blue" onClick={() => this.copyURL()}>
                                    Copy above URL
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <form 
                                onSubmit = {this.props.handleSubmit((formValues) => {this.submitHandler(formValues)})}
                            >
                                {this.renderField()}
                                <div className="center">
                                    <button type="submit" className="teal btn-flat white-text">
                                        Update
                                        <i className="material-icons right">done</i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Doctor Name</th>
                                <td>{ this.props.doctorStatus.data.name }</td>
                            </tr>
                            <tr>
                                <th>Doctor ID</th>
                                <td>{ this.props.doctorStatus.data._id }</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>
                                    {
                                        this.props.doctorStatus.data.status ? 
                                        <span className="badge green darken-1 white-text">Active</span> : 
                                        <span className="badge red lighten-1 white-text">Inactive</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th>Token</th>
                                <td>{ this.props.doctorStatus.data.status ? this.props.doctorStatus.data.token_number : '-' }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    render(){
        return (
            <div>{this.renderContent()}</div>);
    }
}

function validate(values){
    const errors = {};

    _.each(formFields, ({ name }) => {
        if(!values[name]){
            errors[name] = 'You must provide a value';
        }
    });

    if(values.status === "Inactive"){
        errors.token_number = null;
    }

    return errors;
}

function mapStateToProps(state){
    return {
        doctorStatus: state.doctorStatus,
        doctorStatusFormValues: getFormValues('doctorStatusForm')(state)
    }
}

export default connect(mapStateToProps, actions)(reduxForm({
    validate,
    form: 'doctorStatusForm'
})(DoctorStatus));