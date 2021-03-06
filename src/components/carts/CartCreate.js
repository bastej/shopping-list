import React, { Component } from "react";
import { connect } from "react-redux";
import ListCreate from "../ListCreate";

import { createNewCart } from "../../actions";
import { setNavHeader } from "../../actions";

class CartCreate extends Component {
  componentDidMount() {
    this.props.setNavHeader("Create shopping cart");
  }

  onSubmit = title => {
    this.props.createNewCart(title, this.props.history);
  };

  render() {
    return <ListCreate onSubmit={this.onSubmit} />;
  }
}

export default connect(
  null,
  { createNewCart, setNavHeader }
)(CartCreate);
