import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../UI/Spinner/Spinner';
import Modal from '../UI/Modal/Modal';
import * as actions from '../../actions';

class DoctorStatus extends Component {
    componentDidMount(){
        this.props.fetchDoctorStatus(this.props.match.url);
    }

    componentWillUnmount(){
        this.props.doctorStatusReset();
    }

    copyURL(){
        console.log("af");
        var copyText = document.getElementById("searchURL");
        copyText.select();
        document.execCommand("copy");
    }

    renderContent() {
        if(!this.props.doctorStatus.loaded){
            return (
                <Modal show="true">
                    <Spinner />
                </Modal>
            );
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
                        <textarea
                            id="searchURL"
                            className="blue-text center-align"
                            style={{ marginTop: '15px', border: '0px', outlineColor: 'transparent' }}
                            readOnly={true}
                            value={ window.location.origin + "/search/" +this.props.match.params.doctorId } 
                        />
                        <div className="card-action center">
                            <button className="btn" onClick={() => this.copyURL()}>
                                Copy above URL
                            </button>
                        </div>
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