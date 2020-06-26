import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../actions";
import { connect } from "react-redux";

class Payment extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
          name="FedMail"
          description="Pay 5$ for 5 credits"
          amount={500}
          token={(token) => this.props.addCredits(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <b style={{ cursor: "pointer" }}>Add Credits</b>
        </StripeCheckout>
      </div>
    );
  }
}
export default connect(null, actions)(Payment);
