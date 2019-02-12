import "./Product.scss";
import React from "react";
import _ from "lodash";
import { deleteProduct, updateProductCount } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const Product = props => {
  const { product, match, list, parentComponent } = props;
  const renderContent = () => {
    //SingleList Product render
    if (parentComponent === "SingleList") {
      return (
        <li className="list-group-item product">
          <div className="badge badge-info">{product.count}</div>
          {product.photo && <img className="productImg" src={product.photo} />}
          <span className="name">{" " + product.name}</span>
          <div
            className="btn btn-sm categoryBox"
            data-category={product.category}
          >
            <div className="badge badge-category">
              {product.category + " "}
              <img src={match && match.img} className="categoryImg" />
            </div>
          </div>

          {product.calories && (
            <table className="productsInfo">
              <tbody>
                <tr>
                  <td>
                    <div className="nutrientsBox">
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
                  </td>
                  <td>
                    <div className="tagsBox">
                      {_.map(product.tags, (tag, id) => {
                        return (
                          <span key={id} className="badge badge-warning">
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          <button
            onClick={() => props.deleteProduct(list.id, product.id)}
            className="btn btn-sm btn-green deleteBtn float-right"
          >
            <FontAwesomeIcon className="fa-md" icon="times" />
          </button>
          <div className="btn-group float-right">
            <button
              onClick={() =>
                props.updateProductCount(list.id, product.id, "increment")
              }
              className="btn btn-sm btn-lightgreen"
            >
              <FontAwesomeIcon className="fa-md" icon="angle-up" />
            </button>
            <button
              onClick={() =>
                props.updateProductCount(list.id, product.id, "decrement")
              }
              className="btn btn-sm btn-lightgreen"
            >
              <FontAwesomeIcon className="fa-md" icon="angle-down" />
            </button>
          </div>
        </li>
      );
      //Home Product render
    } else if (parentComponent === "Home") {
      return (
        <div
          key={product.id}
          data-category={product.category}
          className="col-12 col-md-6 col-lg-3"
        >
          <div
            className="product"
            style={
              product.photo && {
                background: "url(" + product.photo + ")"
              }
            }
          >
            <div className="badge badge-info badge-times">
              x {product.usageCount}
            </div>
            <h6 className="name">{product.name} </h6>
            <div className="badge badge-category">
              {product.category + " "}
              <img src={match && match.img} className="categoryImg" />
            </div>

            {product.category !== "non food" && (
              <div>
                <div>
                  <FontAwesomeIcon
                    data-switch="false"
                    className="fa-lg nutrientsSwitch"
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
            )}
          </div>
        </div>
      );
    }
  };
  //Component render
  return renderContent();
};

export default connect(
  null,
  { deleteProduct, updateProductCount }
)(Product);
