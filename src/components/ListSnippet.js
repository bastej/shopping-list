import "./ListSnippet.scss";
import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { deleteCart } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const ListSnippet = props => {
  const { list, endpoint, deleteCart } = props;
  return (
    <div className="single-list-preview">
      <h4>{list.title}</h4>
      <hr />
      <div className="badge badge-warning">
        Products: {_.size(list.productsList)}
      </div>
      <div title="Created">
        <FontAwesomeIcon className="fa-sm" icon="calendar" /> {list.createDate}
      </div>
      <button
        onClick={() => deleteCart(list.id)}
        className="btn btn-sm btn-outline-lightgreen btn-delete"
        title="Delete"
      >
        <FontAwesomeIcon className="fa-md" icon="times" />
      </button>
      <Link
        to={`/${endpoint}/${list.id}`}
        className="btn btn-green btn-block btn-open-list"
      >
        Open
      </Link>
    </div>
  );
};

export default connect(
  null,
  { deleteCart }
)(ListSnippet);
