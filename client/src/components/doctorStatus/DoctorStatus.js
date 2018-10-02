import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../loaders/Loader';
import * as actions from '../../actions';

class DoctorStatus extends Component {
    componentDidMount(){
        this.props.fetchDoctorStatus(this.props.match.url);
    }

    componentWillUnmount(){
        this.props.doctorStatusReset();
    }

    renderContent() {
        console.log("doctorStatus ",this.props);
        if(!this.props.doctorStatus.loaded){
            return (<Loader />);
        }
        return (
            <div>
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
                <div className="card grey lighten-5">
                    <div className="card-content">
                        <p>
                            The following URL can be used by the patients to know about the status of the token:
                        </p>
                        <p className="blue-text" style={{ overflow: 'scroll', marginTop: '15px' }}>
                            { window.location.origin + "/search/" +this.props.match.params.doctorId }
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div>{this.renderContent()}</div>);
    }
}

function mapStateToProps({ doctorStatus }){
    return {
        doctorStatus
    }
}

export default connect(mapStateToProps, actions)(DoctorStatus);