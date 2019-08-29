import "./Product.scss";
import React, { Component } from "react";
// import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { deleteProduct, updateProductCount } from "../../actions";
import PropTypes from "prop-types";

class Product extends Component {

  render() {
    const { product, categoryImg, listID, listType } = this.props;

    return (
      <div className="product">
        <div className="badge badge-info">{product.count}</div>
        {product.photo && (
          <img className="product-img" alt={product.name} src={product.photo} />
        )}
        <span className="name">{" " + product.name}</span>
        <div
          className="btn btn-sm category-box"
          data-category={product.category}
        >
          <div className="badge badge-category">
            {product.category + " "}
            {categoryImg && (
              <img
                src={categoryImg}
                alt={product.category}
                className="category-img"
              />
            )}
          </div>
        </div>
        {/* additional details you can pass as children */}
        {this.props.children}

        <button
          onClick={() => this.props.deleteProduct(listID, product.id, listType)}
          className="btn btn-sm btn-green delete-btn float-right"
        >
          <FontAwesomeIcon className="fa-md" icon="times" />
        </button>
        <div className="btn-group float-right">
          <button
            onClick={() =>
              this.props.updateProductCount(
                listID,
                product.id,
                "increment",
                listType
              )
            }
            className="btn btn-sm btn-lightgreen"
          >
            <FontAwesomeIcon className="fa-md" icon="angle-up" />
          </button>
          <button
            onClick={() =>
              this.props.updateProductCount(
                listID,
                product.id,
                "decrement",
                listType
              )
            }
            className="btn btn-sm btn-lightgreen"
          >
            <FontAwesomeIcon className="fa-md" icon="angle-down" />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteProduct, updateProductCount }
)(Product);

Product.propTypes = {
  listID: PropTypes.number.isRequired,
  listType: PropTypes.string.isRequired,
  categoryImg: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    serving_weight_grams: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    proteins: PropTypes.number,
    fats: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    photo: PropTypes.string
  })
};
