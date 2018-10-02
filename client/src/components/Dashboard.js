import React from 'react';
import { Link } from 'react-router-dom';

import DoctorList from './doctors/DoctorList';

const Dashboard = () => {
    return (
        <div>
            <DoctorList />
            <div className="fixed-action-btn">
                <Link to="/hospital/doctors/new" className="btn-floating btn-large pulse red">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
}


export default Dashboard;