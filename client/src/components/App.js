import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import HospitalForm from './hospitals/HospitalForm';
import DoctorForm from './doctors/DoctorForm';
import DoctorStatus from './doctorStatus/DoctorStatus';
import Toast from './UI/Toast/Toast';
import * as actions from '../actions';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    routerConfiguration() {
        if(this.props.auth.data && !this.props.auth.data._hospital){
            return (
                <Switch>
                    <Route exact path="/hospital/new" component={HospitalForm} />
                    <Redirect to="/hospital/new" />
                </Switch>
            );
        }if(this.props.auth.data){
            return (
                <Switch>
                    <Route exact path="/hospital/doctors" component={Dashboard} />
                    <Route exact path="/hospital/doctors/new" component={DoctorForm} />
                    <Route exact path="/hospital/doctors/:doctorId" component={DoctorStatus} />
                    <Redirect to="/hospital/doctors" />
                </Switch>
            );
        }else{
            return (
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Redirect to="/" />
                </Switch>
            );
        }
    }

    render(){
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        { this.routerConfiguration() }
                        <Toast />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};


function mapStateToProps({ auth }){
    return { auth };
};

export default connect(mapStateToProps, actions)(App);