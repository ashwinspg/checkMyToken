import React from 'react';

import '../../../css/ui.css';

const backdrop = (props) => (
    props.show ? <div className="_backdrop" onClick={props.clicked}></div> : null
);


export default backdrop;