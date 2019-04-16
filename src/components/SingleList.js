import "./SingleList.scss";
import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Product from "./Product";
import AddProductForm from "./AddProductForm";
import NutrientsTable from "./NutrientsTable";
import { setNavHeader } from '../actions';

class SingleList extends Component {
  // state = {
  //   calories: 0,
  //   carbohydrates: 0,
  //   proteins: 0,
  //   fats: 0
  // };
  
  componentDidMount() {
    // this.calculateNutrients();
    this.props.setNavHeader(this.props.list.title, _.size(this.props.list.productsList));
  }
  componentDidUpdate() {
    this.props.setNavHeader(this.props.list.title, _.size(this.props.list.productsList));
  }

  calculateNutrients = () => {
    let calories = 0,
      carbohydrates = 0,
      proteins = 0,
      fats = 0;
    _.map(this.props.list.productsList, product => {
      product.calories && (calories += product.calories * product.count);
      product.carbohydrates && (carbohydrates += product.carbohydrates * product.count);
      product.proteins && (proteins += product.proteins * product.count);
      product.fats && (fats += product.fats * product.count);
    });
    return {calories, carbohydrates, proteins, fats}
  }

  render() {
    // calculate when first init, and when props update
    // zamiast tego, aktualizowac state jak dostaniemy props od redux(jak?)
    // i do NutrientsTable przekazac z state
    const nutrientsValues = this.calculateNutrients();

    const { list, categories } = this.props;
    const { calories, carbohydrates, proteins, fats } = nutrientsValues;
    if (!list) {
      return (
        <div>
          Loading...
          <Link to="/">Back to home</Link>
        </div>
      );
    }
    return (
      <div className="single-list">
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
          <div className="row products-list">
            <div className="col">
              <ul className="list-group">
                {_.map(list.productsList, product => {
                  let match = _.find(categories, { name: product.category });
                  return (
                    <li key={product.id} className="list-group-item">
                      <Product
                        product={product}
                        list={list}
                        match={match}
                        parentComponent={"SingleList"}
                      />
                  </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <NutrientsTable 
                calories={calories} 
                carbohydrates={carbohydrates}
                proteins={proteins}
                fats={fats}
              />
            </div>
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
  { setNavHeader }
)(SingleList);
