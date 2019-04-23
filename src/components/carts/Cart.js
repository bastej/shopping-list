import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ListCreator from "../ListCreator";
import Product from "../products/Product";

class Cart extends Component {
  renderCartProducts = (list, categories) => {
    return _.map(list.productsList, product => {
      let match = _.find(categories, { name: product.category });
      return (
        <li key={product.id} className="list-group-item">
          <Product
            product={product}
            listID={list.id}
            listType={list.type}
            match={match}
          />
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
    cart: carts[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps)(Cart);
