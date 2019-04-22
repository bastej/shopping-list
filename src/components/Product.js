import "./Product.scss";
import React, { Component } from "react";
import _ from "lodash";
import { deleteProduct, updateProductCount } from "../actions";
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

  renderProductInfo = (product) => {
    const { serving_weight_grams, calories, carbohydrates, proteins, fats, count } = product;
    if(product.calories) {
      return (
        <div className="products-info">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="nutrients-box">
                <span>
                  Portion:{" "}{serving_weight_grams ? count * serving_weight_grams: "0.0"}
                </span>
                <span>
                  {" "} | Calories:{" "}{calories ? count * calories : "0.0"}
                </span>
                <span>
                  {" "}| Carbohydrates:{" "}{carbohydrates ? (count * carbohydrates).toFixed(1): "0.0"}
                </span>
                <span>
                  {" "}| Proteins:{" "}{proteins ? (count * proteins).toFixed(1) : "0.0"}
                </span>
                <span>
                  {" "} | Fats:{" "}{fats ? (count * fats).toFixed(1) : "0.0"}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="tags-box">
                {_.map(product.tags, (tag, id) => {
                  return (
                    <span key={id} className="badge badge-warning">
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() { 
    const { product, match, cart } = this.props;
    return ( 
      <div className="product">
        <div className="badge badge-info">{product.count}</div>
        {product.photo && <img className="product-img" alt={product.name} src={product.photo} />}
        <span className="name">{" " + product.name}</span>
        <div
          className="btn btn-sm category-box"
          data-category={product.category}
        >
          <div className="badge badge-category">
            {product.category + " "}
            {match && <img src={match.img} alt={product.category} className="category-img" />}
          </div>
        </div>

        {this.renderProductInfo(product)}

        <button
          onClick={() => this.props.deleteProduct(cart.id, product.id)}
          className="btn btn-sm btn-green delete-btn float-right"
        >
          <FontAwesomeIcon className="fa-md" icon="times" />
        </button>
        <div className="btn-group float-right">
          <button
            onClick={() =>
              this.props.updateProductCount(cart.id, product.id, "increment")
            }
            className="btn btn-sm btn-lightgreen"
          >
            <FontAwesomeIcon className="fa-md" icon="angle-up" />
          </button>
          <button
            onClick={() =>
              this.props.updateProductCount(cart.id, product.id, "decrement")
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
