import M from 'materialize-css/dist/js/materialize.min.js';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
    componentDidMount(){
        document.addEventListener('DOMContentLoaded', function() {
            M.Sidenav.init(document.querySelectorAll('.sidenav'), {
                edge: 'right',
                closeOnClick: true,
                draggable: true
            });
        });
    }
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                );
            default:
                if(!this.props.auth.basicInfo){
                    return (
                        <li><a href="/api/logout">Logout</a></li>
                    );
                }else{
                    return [
                        <li key="1">
                            Credits: {this.props.auth.credits}
                        </li>,
                        <li key="2"><Payments /></li>,
                        <li key="3"><a href="/api/logout">Logout</a></li>
                    ];
                }
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper indigo darken-1">
                    <Link 
                        to={this.props.auth ? (!this.props.auth.basicInfo ? '/hospital/new' : '/hospital/doctors') : '/'} 
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
        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};

export default connect(mapStateToProps)(Header);