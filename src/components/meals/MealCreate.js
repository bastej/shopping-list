import React, { Component } from "react";
import { connect } from "react-redux";
import ListCreate from "../ListCreate";

import { createNewMeal } from "../../actions";
import { setNavHeader } from "../../actions";

class MealCreate extends Component {
  componentDidMount() {
    this.props.setNavHeader("Create meal");
  }

  onSubmit = title => {
    this.props.createNewMeal(title, this.props.history);
  };

  render() {
    return <ListCreate onSubmit={this.onSubmit} />;
  }
}

export default connect(
  null,
  { createNewMeal, setNavHeader }
)(MealCreate);
