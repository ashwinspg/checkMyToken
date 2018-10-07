import React from 'react';

import Modal from '../Modal/Modal';

const Alert = (props) => {
    return (
        <div className="center-align">
            <Modal show="true" showContainer="true" modalClosed={() => props.onAlertClosed()}>
                <div>
                    <i className="large red-text material-icons">warning</i>
                </div>
                { props.children }
                <div style={{ margin: '20px 0' }}>
                    <button className="indigo darken-5 btn-flat white-text" onClick={() => props.onAlertClosed()}>
                        GOT IT!
                    </button>
                </div>
            </Modal>
        </div>
    );
};


export default Alert;