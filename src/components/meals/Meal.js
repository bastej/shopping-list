import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ProductListCreator from "../ProductListCreator";
import NutrientsTable from "../NutrientsTable";
import Product from "../Product";
import ProductDetails from "../ProductDetails";
import { calculateNutrients } from "../../actions";

class Meal extends Component {
  componentDidUpdate() {
    this.props.calculateNutrients(this.props.meal.productsList);
  }

  renderMealProducts = (list, categories) => {
    return _.map(list.productsList, product => {
      let match = _.find(categories, { name: product.category });
      return (
        <li key={product.id} className="list-group-item">
          <Product
            product={product}
            listID={list.id}
            listType={list.type}
            match={match}
          >
            <ProductDetails product={product} />
          </Product>
        </li>
      );
    });
  };

  // this.renderProductDetails(product)

  render() {
    const { meal } = this.props;
    return (
      <ProductListCreator list={meal} renderProducts={this.renderMealProducts}>
        <NutrientsTable productsList={meal.productsList} />
      </ProductListCreator>
    );
  }
}

const mapStateToProps = ({ meals }, ownProps) => {
  return {
    meal: meals[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { calculateNutrients }
)(Meal);
