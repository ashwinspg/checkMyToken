import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Payments extends Component {

    tokenHandler(token){
        this.props.handleToken(token);
    }

    render(){
        return (
            <StripeCheckout
                name="checkMyToken"
                description="$5 for adding 5 Doctors"
                amount = {500}
                token = { token => this.tokenHandler(token)}
                stripeKey = {process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}


export default connect(null, actions)(Payments);