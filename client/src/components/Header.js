import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payments";
class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <a href="/">{<Payment />}</a>
          </li>,
          <li key="3" style={{ margin: "0px 10px" }}>
            Credits : <b>{this.props.auth.credits}</b>
          </li>,

          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    console.log(this.props.auth);
    return (
      <nav>
        <Link className="brand-logo" to={this.props.auth ? "/surveys" : "/"}>
          FedMail
        </Link>
        <div className="nav-wrapper">
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
