import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { calculateNutrients } from "../../actions";
import ErrorBoundary from "../ErrorBoundary";
import ListCreator from "../ListCreator";
import NutrientsTable from "../NutrientsTable";
import Product from "../products/Product";
import ProductDetails from "../products/ProductDetails";

class Meal extends Component {
  componentDidUpdate() {
    this.props.calculateNutrients(this.props.meal.productsList);
  }

  renderMealProducts = (list, categories) => {
    return _.map(list.productsList, product => {
      const matchCategory = _.find(categories, { name: product.category });
      return (
        <li key={product.id} className="list-group-item">
          <ErrorBoundary>
            <Product
              product={product}
              listID={list.id}
              listType={list.type}
              categoryImg={matchCategory && matchCategory.img}
            >
              <ProductDetails product={product} />
            </Product>
          </ErrorBoundary>
        </li>
      );
    });
  };

  // this.renderProductDetails(product)

  render() {
    const { meal } = this.props;
    return (
      <ListCreator list={meal} renderProducts={this.renderMealProducts}>
        <NutrientsTable productsList={meal.productsList} />
      </ListCreator>
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
