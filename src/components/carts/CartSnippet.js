import "./CartSnippet.scss";
import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { deleteCart } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const CartSnippet = props => {
  const { cart, deleteCart } = props;
  return (
    <div className="single-list-preview">
      <h4>{cart.title}</h4>
      <hr />
      <div className="badge badge-warning">
        Products: {_.size(cart.productsList)}
      </div>
      <div title="Created">
        <FontAwesomeIcon className="fa-sm" icon="calendar" /> {cart.createDate}
      </div>
      <button
        onClick={() => deleteCart(cart.id)}
        className="btn btn-sm btn-outline-lightgreen btn-delete"
        title="Delete"
      >
        <FontAwesomeIcon className="fa-md" icon="times" />
      </button>
      <Link
        to={`/carts/${cart.id}`}
        className="btn btn-green btn-block btn-open-list"
      >
        Open cart
      </Link>
    </div>
  );
};

export default connect(
  null,
  { deleteCart }
)(CartSnippet);
