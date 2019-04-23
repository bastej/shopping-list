import "./Product.scss";
import React, { Component } from "react";
import _ from "lodash";
import { deleteProduct, updateProductCount } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

class Product extends Component {
  constructor(props) {
    super(props);
    // this.productShowDetails = React.createRef();
  }

  componentDidMount() {
    // console.log(typeof this.productShowDetails.current);
    // this.productShowDetails.current.onClick = () => alert(2);
  }

  render() {
    const { product, match, listID, listType } = this.props;
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
            {match && (
              <img
                src={match.img}
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
