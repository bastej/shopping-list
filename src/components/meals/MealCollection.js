import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { setNavHeader } from "../../actions";
import ListCollection from "../ListCollection";

class CartCollection extends Component {
  componentDidMount() {
    this.props.setNavHeader("All meals", _.size(this.props.meals));
  }

  componentDidUpdate() {
    this.props.setNavHeader("All meals", _.size(this.props.meals));
  }

  render() {
    return <ListCollection lists={this.props.meals} />;
  }
}

function mapStateToProps({ meals }) {
  return {
    meals
  };
}

export default connect(
  mapStateToProps,
  { setNavHeader }
)(CartCollection);
