import "./Navbar.scss";
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from 'react-redux';

const renderHeader = (header) => {
  if(!header.tag) {
    return <span className="page-header navbar-brand">
      {header.text}
    </span>
  } else {
    return <div className="navbar-brand abs">
      <span className="page-header">{header.text + " "}</span>
      <span className="badge badge-pill badge-warning">
        {header.tag}
      </span>            
    </div>
  }
}

const Navbar = props => {
  const { header } = props;
  return (
    <div>
      <nav className="navbar navbar-dark text-white">
        <div className="container">
          <NavLink exact to={"/"} className="btn btn-outline-green go-home-btn">
            <FontAwesomeIcon className="fa-lg" icon="home" />{" "}
            <span>Go Home</span>
          </NavLink>
          {renderHeader(header)}
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

const mapStateToProps = ({ currentNavHeader }) => {
  return { 
    header: currentNavHeader
  }
}

export default connect(mapStateToProps)(Navbar);
