import React, { Component } from "react";
import _ from "lodash";

class ProductDetails extends Component {
  renderProductDetails = product => {
    const {
      serving_weight_grams,
      calories,
      carbohydrates,
      proteins,
      fats,
      count
    } = product;

    return (
      <div className="products-info">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="nutrients-box">
              <span>
                Portion:{" "}
                {serving_weight_grams ? count * serving_weight_grams : "0.0"}
              </span>
              <span> | Calories: {calories ? count * calories : "0.0"}</span>
              <span>
                {" "}
                | Carbohydrates:{" "}
                {carbohydrates ? (count * carbohydrates).toFixed(1) : "0.0"}
              </span>
              <span>
                {" "}
                | Proteins: {proteins ? (count * proteins).toFixed(1) : "0.0"}
              </span>
              <span> | Fats: {fats ? (count * fats).toFixed(1) : "0.0"}</span>
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
    );
  };

  render() {
    return <div>{this.renderProductDetails(this.props.product)}</div>;
  }
}

export default ProductDetails;
