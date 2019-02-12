import React from "react";
import _ from "lodash";
import { Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.sass";

const Navbar = props => {
  const { list, lists } = props;
  return (
    <div>
      <nav className="navbar navbar-dark text-white">
        <div className="container">
          <NavLink exact to={"/"} className="btn btn-outline-green goHomeBtn">
            <FontAwesomeIcon className="fa-lg" icon="home" />{" "}
            <span>Go Home</span>
          </NavLink>
          <Route
            exact
            path={"/"}
            render={() => (
              <span className="pageHeader navbar-brand">Shopping list App</span>
            )}
          />
          <Route
            exact
            path={"/lists/:id"}
            render={() => (
              <a href="#" className="navbar-brand abs">
                <span className="pageHeader">{list.title + " "}</span>
                <span className="badge badge-pill badge-warning">
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
                <span className="pageHeader">All lists </span>
                <span className="badge badge-pill badge-warning">
                  {_.size(lists)}
                </span>
              </a>
            )}
          />
          <NavLink
            exact
            to={"/lists"}
            className="btn btn-outline-green allListBtn"
          >
            <FontAwesomeIcon icon="shopping-basket" /> <span>All lists</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;