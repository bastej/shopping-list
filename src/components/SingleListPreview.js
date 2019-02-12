import "./SingleListPreview.scss";
import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { deleteList } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const SingleListPreview = props => {
  const { list, deleteList } = props;
  console.log(props);
  return (
    <div className="homeListTile">
      <h4>{list.title}</h4>
      <hr />
      <div className="badge badge-warning">
        Products: {_.size(list.productsList)}
      </div>
      <div title="Created">
        <FontAwesomeIcon className="fa-sm" icon="calendar" /> {list.createDate}
      </div>
      <button
        onClick={() => deleteList(list.id)}
        className="btn btn-sm btn-outline-lightgreen btnDelete"
        title="Delete"
      >
        <FontAwesomeIcon className="fa-md" icon="times" />
      </button>
      <Link
        to={`/lists/${list.id}`}
        className="btn btn-green btn-block btnOpenList"
      >
        Open list
      </Link>
      <div>
        {/* kcal: {product.calories} | w: {product.carbohydrates} | b:{" "}
                    {product.proteins} | t: {product.fats} */}
      </div>
    </div>
  );
};

export default connect(
  null,
  { deleteList }
)(SingleListPreview);
