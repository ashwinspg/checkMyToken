import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';

import Payments from './payments/Payments';
import Aux from './hoc/Aux/Aux';
import Spinner from './UI/Spinner/Spinner';
import Modal from './UI/Modal/Modal';
import * as actions from '../actions'

class Header extends Component {
    renderContent(){
        switch(this.props.auth.data){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google" onClick={() => this.props.showLoader()}>Login with Google</a></li>
                );
            default:
                if(!this.props.auth.data.basicInfo){
                    return (
                        <li><a href="/api/logout" onClick={() => this.props.showLoader()}>Logout</a></li>
                    );
                }else{
                    return [
                        <li key="1">
                            Credits: {this.props.auth.data.credits}
                        </li>,
                        <li key="2"><Payments /></li>,
                        <li key="3"><a href="/api/logout" onClick={() => this.props.showLoader()}>Logout</a></li>
                    ];
                }
        }
    }

    render(){
        return (
            <Aux>
                {
                    this.props.header.loader ?
                    (
                        <Modal show="true">
                            <Spinner />
                        </Modal>
                    ) :
                    null
                }
                <nav>
                    <div className="nav-wrapper indigo darken-1">
                        <Link 
                            to={this.props.auth.data ? (!this.props.auth.data.basicInfo ? '/hospital/new' : '/hospital/doctors') : '/'} 
                            className="left brand-logo"
                        >
                            checkMyToken
                        </Link>
                        <ul id="slide-out" className="header-links sidenav center-align black-text">
                            {this.renderContent()}
                        </ul>
                        <ul className="header-links right hide-on-med-and-down">
                            {this.renderContent()}
                        </ul>
                        <a href="#" data-target="slide-out" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
            </Aux>
        );
    }
}

function mapStateToProps({ header, auth }){
    return { header, auth };
};

export default connect(mapStateToProps, actions)(Header);