import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { addProduct, addCategory } from "../actions";
import Navbar from "./Navbar";
import ProductSearch from "./ProductSearchInput";
import Product from "./Product";
import "./SingleList.scss";

class SingleList extends Component {
  state = {
    calories: 0,
    carbohydrates: 0,
    proteins: 0,
    fats: 0
  };

  componentDidMount() {
    //at first calculate nutrients of products and output to table
    this.renderNutrientsTable();
  }

  renderNutrientsTable = () => {
    let calories = 0;
    let carbohydrates = 0;
    let proteins = 0;
    let fats = 0;
    _.map(this.props.list.productsList, product => {
      product.calories && (calories += product.calories * product.count);
      product.carbohydrates &&
        (carbohydrates += product.carbohydrates * product.count);
      product.proteins && (proteins += product.proteins * product.count);
      product.fats && (fats += product.fats * product.count);
    });
    return (
      <table className="table bg-white sumNutrientsTable">
        <thead>
          <tr className="bg-lightBlue text-white">
            <th scope="col">Nutrients of products</th>
            <th scope="col">Total value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" className="font-weight-bold">
              Calories
            </td>
            <td>{calories.toFixed(1)}</td>
          </tr>
          <tr>
            <td scope="row" className="font-weight-bold">
              Carbohydrates
            </td>
            <td>{carbohydrates.toFixed(1)}</td>
          </tr>
          <tr>
            <td scope="row" className="font-weight-bold">
              Proteins
            </td>
            <td>{proteins.toFixed(1)}</td>
          </tr>
          <tr>
            <td scope="row" className="font-weight-bold">
              Fats
            </td>
            <td>{fats.toFixed(1)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  renderField(field) {
    const className = `form-control ${
      field.meta.touched && field.meta.error ? "is-invalid" : ""
    }`;
    return (
      <div className="form-group">
        <input
          type={field.input.name === "count" ? "number" : "text"}
          list={field.list || ""}
          className={className}
          placeholder={field.placeholder}
          {...field.input}
        />

        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.addProduct(values, this.props.match.params.id);
    this.props.addCategory(values.category);
    this.props.reset("ProductsNewForm");
  }

  render() {
    const { list, handleSubmit, categories } = this.props;
    if (!list) {
      return (
        <div>
          <Navbar list={list} />
          Loading...
          <Link to="/">Back to home</Link>
        </div>
      );
    }
    return (
      <div className="singleList">
        <Navbar list={list} />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <form
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    className="form-group"
                    id="test1"
                  >
                    <Field
                      component={this.renderField}
                      name="count"
                      placeholder="Set count"
                    />
                    <Field
                      component={this.renderField}
                      list="categories"
                      name="category"
                      placeholder="Choose category"
                    />
                    <ProductSearch />

                    <datalist id="categories" style={{ width: "100%" }}>
                      {_.map(categories, category => {
                        return (
                          <option key={category.id} value={category.name} />
                        );
                      })}
                    </datalist>

                    <button
                      className="btn btn-green btn-block font-weight-bold"
                      type="submit"
                    >
                      Add to List
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row productsList">
            <div className="col">
              <ul className="list-group">
                {_.map(list.productsList, product => {
                  let match = _.find(categories, { name: product.category });
                  return (
                    <Product
                      key={product.id}
                      product={product}
                      list={list}
                      match={match}
                      parentComponent={"SingleList"}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">{this.renderNutrientsTable()}</div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  console.log("validacja: ", values);
  const errors = {};
  if (!values.name) {
    errors.name = "Enter a name!";
  }
  if (!values.category) {
    errors.category = "Enter a category!";
  }
  if (values.count < 1) {
    errors.count = "Enter value bigger than 0!";
  }
  if (!values.count) {
    errors.count = "Enter a count!";
  }
  return errors;
}

function mapStateToProps({ lists, products, categories }, ownProps) {
  return {
    list: lists[ownProps.match.params.id],
    products,
    categories
  };
}

export default reduxForm({
  validate,
  form: "ProductsNewForm", //nazwa formularza, jakby byl dwa na stronie zeby rozroznic
  fields: ["count", "category", "name"]
})(
  connect(
    mapStateToProps,
    {
      addProduct,
      addCategory,
      reset
    }
  )(SingleList)
);
