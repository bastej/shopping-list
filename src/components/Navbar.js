import "./Navbar.scss";
import React from "react";
import _ from "lodash";
import { Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = props => {
  const { list, lists } = props;
  return (
    <div>
      <nav className="navbar navbar-dark text-white">
        <div className="container">
          <NavLink exact to={"/"} className="btn btn-outline-green go-home-btn">
            <FontAwesomeIcon className="fa-lg" icon="home" />{" "}
            <span>Go Home</span>
          </NavLink>
          <Route
            exact
            path={"/"}
            render={() => (
              <span className="page-header navbar-brand">Shopping list App</span>
            )}
          />
          <Route
            exact
            path={"/lists/:id"}
            render={() => (
              <div className="navbar-brand abs">
                <span className="page-header">{list.title + " "}</span>
                <span className="badge badge-pill badge-warning">
                  {_.size(list.productsList)}
                </span>
                {/* {console.log("navbar/ props: " + props)} */}
              </div>
            )}
          />
          <Route
            exact
            path={"/lists"}
            render={() => (
              <div className="navbar-brand abs">
                <span className="page-header">All lists </span>
                <span className="badge badge-pill badge-warning">
                  {_.size(lists)}
                </span>
              </div>
            )}
          />
          <NavLink
            exact
            to={"/lists"}
            className="btn btn-outline-green all-list-btn"
          >
            <FontAwesomeIcon icon="shopping-basket" /> <span>All lists</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
