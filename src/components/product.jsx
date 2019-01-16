import React from "react";
import _ from "lodash";
import { deleteProduct, updateProductCount } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const Product = props => {
  const { product, match, list } = props;

  return (
    <li className="list-group-item bg-light product">
      <div className="badge badge-warning">{product.count}</div>
      {product.photo && <img className="productImg" src={product.photo} />}
      <span className="name">{" " + product.name}</span>
      <div className="btn btn-sm categoryBox" data-category={product.category}>
        <div className="badge badge-category">
          {product.category + " "}
          <img src={match.img} className="categoryImg" />
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
                      ? (product.count * product.serving_weight_grams).toFixed(
                          1
                        )
                      : "0.0"}
                  </span>
                  <span>
                    {" "}
                    | Calories:{" "}
                    {product.calories
                      ? (product.count * product.calories).toFixed(1)
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
                      <span key={id} className="badge badge-success">
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
        className="btn btn-sm btn-danger deleteBtn float-right"
      >
        <FontAwesomeIcon className="fa-md" icon="times" />
      </button>
      <div className="btn-group float-right">
        <button
          onClick={() =>
            props.updateProductCount(list.id, product.id, "increment")
          }
          className="btn btn-sm btn-primary"
        >
          <FontAwesomeIcon className="fa-md" icon="angle-up" />
        </button>
        <button
          onClick={() =>
            props.updateProductCount(list.id, product.id, "decrement")
          }
          className="btn btn-sm btn-primary"
        >
          <FontAwesomeIcon className="fa-md" icon="angle-down" />
        </button>
      </div>
    </li>
  );
};

export default connect(
  null,
  { deleteProduct, updateProductCount }
)(Product);
