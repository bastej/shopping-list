import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { deleteList } from "../actions";
import { connect } from "react-redux";
import Navbar from "./navbar";

class Home extends Component {
  render() {
    const { lists, deleteList } = this.props;
    return (
      <React.Fragment>
        <Navbar lists={lists} />
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Lists:</h3>
              <ul className="list-group">
                {_.map(lists, (list, index) => {
                  return (
                    <li key={list.id} className="list-group-item">
                      <Link to={`/lists/${list.id}`}>
                        {index + 1}. {list.title}{" "}
                      </Link>
                      <div className="badge badge-warning">
                        Products: {_.size(list.productsList)}
                      </div>
                      <div>Data utworzenia: {list.createDate}</div>
                      <button
                        onClick={() => deleteList(list.id)}
                        className="btn btn-danger float-right"
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ lists }) {
  return {
    lists
  };
}

export default connect(
  mapStateToProps,
  {}
)(Home);
