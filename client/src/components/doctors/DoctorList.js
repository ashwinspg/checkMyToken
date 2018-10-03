import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../UI/Spinner/Spinner';
import Modal from '../UI/Modal/Modal';
import * as actions from '../../actions';

class DoctorList extends Component {
    componentDidMount(){
        this.props.fetchDoctors();
    }

    renderContent(){
        if(!this.props.doctors.loaded){
            return (
                <Modal show="true">
                    <Spinner />
                </Modal>
            );
        }
        return this.props.doctors.data.map(doctor => {
            return (
                <Link to={"/hospital/doctors/" + doctor._id} key={doctor._id} className="black-text">
                    <div className="card hoverable grey lighten-5">
                        <div className="card-content">
                            <span className="card-title">{doctor.name}</span>
                            <p>
                                ID: {doctor._id}
                            </p>
                        </div>
                        <div className="card-action grey lighten-3">
                            <span>Token: {doctor.status ? doctor.token_number : '-'}</span>
                            <span className="right">
                                Status: {
                                    doctor.status ? 
                                    <span className="badge green darken-1 white-text">Active</span> : 
                                    <span className="badge red lighten-1 white-text">Inactive</span>
                                }
                            </span>
                        </div>
                    </div>
                </Link>
            );
        });
    }

    render(){
        return (
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

function mapStateToProps({ doctors }){
    return {
        doctors
    }
}


export default connect(mapStateToProps, actions)(DoctorList);