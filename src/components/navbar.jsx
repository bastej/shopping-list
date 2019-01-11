import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Route, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/navbar.css";

class Navbar extends Component {
  componentDidMount() {
    console.log("this.props: ", this.props);
  }

  render() {
    const { list, lists } = this.props;
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
            <NavLink exact to={"/"} className="btn btn-warning goHomeBtn">
              <FontAwesomeIcon className="fa-lg" icon="home" /> Go Home
            </NavLink>
            <Route
              exact
              path={"/lists/:id"}
              render={router => (
                <a href="#" className="navbar-brand abs">
                  {list.title + " "}
                  <span className="badge badge-pill badge-info">
                    {_.size(list.productsList)}
                  </span>
                  {/* {console.log("navbar/ props: " + props)} */}
                </a>
              )}
            />
            <Route
              exact
              path={"/lists"}
              render={() => (
                <a href="#" className="navbar-brand abs">
                  All lists{" "}
                  <span className="badge badge-pill badge-info">
                    {_.size(lists)}
                  </span>
                </a>
              )}
            />
            <NavLink exact to={"/lists"} className="btn btn-warning allListBtn">
              <FontAwesomeIcon icon="shopping-basket" /> All lists
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ lists }, ownProps) {
  console.log("ownProps: ", ownProps);
  return {
    list: lists[0]
  };
}

export default connect(mapStateToProps)(Navbar);
