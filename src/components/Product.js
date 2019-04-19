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

  renderContent = () => {
    const { product, match, list, parentComponent } = this.props;
    // TODO uzyc nesting comp ?
    //SingleList Product render
    if (parentComponent === "SingleList") {
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

          {product.calories && (
            <div className="products-info">
              <div className="row">
                <div className="col-12 col-lg-6">
                  <div className="nutrients-box">
                    <span>
                      Portion:{" "}
                      {product.serving_weight_grams
                        ? product.count * product.serving_weight_grams
                        : "0.0"}
                    </span>
                    <span>
                      {" "}
                      | Calories:{" "}
                      {product.calories
                        ? product.count * product.calories
                        : "0.0"}
                    </span>
                    <span>
                      {" "}
                      | Carbohydrates:{" "}
                      {product.carbohydrates
                        ? (product.count * product.carbohydrates).toFixed(1)
                        : "0.0"}
                    </span>
                    <span>
                      {" "}
                      | Proteins:{" "}
                      {product.proteins
                        ? (product.count * product.proteins).toFixed(1)
                        : "0.0"}
                    </span>
                    <span>
                      {" "}
                      | Fats:{" "}
                      {product.fats
                        ? (product.count * product.fats).toFixed(1)
                        : "0.0"}
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
          )}

          <button
            onClick={() => this.props.deleteProduct(list.id, product.id)}
            className="btn btn-sm btn-green delete-btn float-right"
          >
            <FontAwesomeIcon className="fa-md" icon="times" />
          </button>
          <div className="btn-group float-right">
            <button
              onClick={() =>
                this.props.updateProductCount(list.id, product.id, "increment")
              }
              className="btn btn-sm btn-lightgreen"
            >
              <FontAwesomeIcon className="fa-md" icon="angle-up" />
            </button>
            <button
              onClick={() =>
                this.props.updateProductCount(list.id, product.id, "decrement")
              }
              className="btn btn-sm btn-lightgreen"
            >
              <FontAwesomeIcon className="fa-md" icon="angle-down" />
            </button>
          </div>
        </div>
      );
      //Home Product render
    } else if (parentComponent === "Home") {
      return (
          <div className="product">
            <div className="badge badge-info badge-times">
              x {product.usageCount}
            </div>
            <h6 className="name">{product.name} </h6>
            <div className="badge badge-category">
              {product.category + " "}
              {match && <img src={match.img} alt={product.category} className="category-img" />}
            </div>

            <div>
                <div>{/* ref={this.productShowDetails} */}
                  <FontAwesomeIcon
                    data-switch="false"
                    className="fa-lg nutrients-switch"
                    icon="angle-down"
                  />
                </div>
                <div className="nutrients">
                  <div className="float-right nutrients_info">
                    w {product.serving_weight_grams || "--"} g/ml
                  </div>
                  <div className="nutrients_kcal">
                    cal: {product.calories || "0"}
                  </div>
                  <div className="nutrients_w">
                    c: {product.carbohydrates || "0"}
                  </div>
                  <div className="nutrients_b">
                    p: {product.proteins || "0"}
                  </div>
                  <div className="nutrients_t">f: {product.fats || "0"}</div>
                </div>
              </div>
          </div>
      );
    }
  };

  render() { 
    return ( 
      <div>
        {this.renderContent()}
      </div>
     );
  }
}

export default connect(
  null,
  { deleteProduct, updateProductCount }
)(Product);
