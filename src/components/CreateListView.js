import React, { Component } from "react";
import "./CreateListView.sass";
import { connect } from "react-redux";
import { createNewList } from "../actions";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

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
      <div className="createNewList">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 offset-lg-3">
              <div className="card">
                <div className="card-header bg-lightBlue text-white">
                  <h4>Create new list</h4>
                </div>
                <div className="card-body">
                  <input
                    onChange={this.updateNewListName}
                    className="form-control m-2"
                    type="text"
                    placeholder="Text here list name..."
                  />
                  <button
                    onClick={() =>
                      this.props.createNewList(this.state.newListName)
                    }
                    className="btn btn-green btn-lg btn-block"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createNewList }
)(CreateListView);