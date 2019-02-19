import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import Product from "./Product";
import "./SingleList.scss";
import AddProductForm from "./AddProductForm";

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

  render() {
    const { list, categories } = this.props;
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
                  <AddProductForm listID={this.props.match.params.id} />
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

function mapStateToProps({ lists, products, categories }, ownProps) {
  return {
    list: lists[ownProps.match.params.id],
    products,
    categories
  };
}

export default connect(
  mapStateToProps,
  {}
)(SingleList);
