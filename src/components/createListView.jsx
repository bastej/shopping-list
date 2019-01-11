import React, { Component } from "react";
// import "./styles/createListView.css";
import { connect } from "react-redux";
import { createNewList } from "../actions";
import { Link } from "react-router-dom";

class CreateListView extends Component {
  state = {
    newListName: ""
  };

  updateNewListName = e => {
    const newListName = e.target.value;
    this.setState({ newListName });
  };

  // getCurrentClass = () => {
  //     let classes = "btn btn-success input-group m-2 ";
  //     classes += this.state.newListName ? "" : "disabled"
  //     return classes;
  // }

  render() {
    return (
      <React.Fragment>
        <div className="container m-3">
          <div className="row">
            <div className="col-3">
              <input
                onChange={this.updateNewListName}
                className="input-group m-2"
                type="text"
                placeholder="Text here list name..."
              />
              <button
                onClick={() => this.props.createNewList(this.state.newListName)}
                className="btn btn-primary"
              >
                NEW
              </button>
              <Link to="/">Back to home</Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { createNewList }
)(CreateListView);
