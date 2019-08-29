import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ListCreator from "../ListCreator";
import Product from "../products/Product";
import ErrorBoundary from "../ErrorBoundary";

class Cart extends Component {
  renderCartProducts = (list, categories) => {
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
            />
          </ErrorBoundary>
        </li>
      );
    });
  };

  render() {
    const { cart } = this.props;
    return <ListCreator list={cart} renderProducts={this.renderCartProducts} />;
  }
}

const mapStateToProps = ({ carts }, ownProps) => {
  return {
    cart: ownProps.match && carts[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps)(Cart);
