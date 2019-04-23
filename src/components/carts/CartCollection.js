import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { setNavHeader } from "../../actions";
import ListCollection from "../ListCollection";

class CartCollection extends Component {
  componentDidMount() {
    this.props.setNavHeader("All carts", _.size(this.props.carts));
  }

  componentDidUpdate() {
    this.props.setNavHeader("All carts", _.size(this.props.carts));
  }

  render() {
    return <ListCollection lists={this.props.carts} />;
  }
}

function mapStateToProps({ carts }) {
  return {
    carts
  };
}

export default connect(
  mapStateToProps,
  { setNavHeader }
)(CartCollection);
