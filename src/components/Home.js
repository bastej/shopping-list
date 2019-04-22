import "./Home.scss";
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductSnippet from "./ProductSnippet";
import CartSnippet from "./carts/CartSnippet";
import { setNavHeader } from '../actions';

class Home extends Component {

  componentDidMount() {
    this.props.setNavHeader('Shopping list App'); 
  }

  renderRecentCarts = (carts) => {
    const recentCarts = _.filter(carts, (el, index) => index > _.size(carts) - 4);
    return _.map(recentCarts, cart=> {
      return (
        <div key={cart.id} className="col-12 col-lg-4">
          <CartSnippet cart={cart} />
        </div>
      );
    })
  }

  renderProducts = (products, categories) => {
    return _.map(products, product => {
      let match = _.find(categories, { name: product.category });
      return (
        <div
          key={product.id}
          data-category={product.category}
          className="col-12 col-md-6 col-lg-3"
        >
          <ProductSnippet
            key={product.id}
            product={product}
            match={match}
          />
        </div>
      );
    })
  }

  render() {
    const { carts, products, categories } = this.props;
    return (
      <div className="home">
        <div className="container">
          <Link
            to="/carts/create"
            className="btn btn-green btn-add-list text-white font-weight-bold"
          >
            <p>Create new cart</p>
            <FontAwesomeIcon className="fa-lg" icon="plus" />
          </Link>
          <div className="row">
            <div className="col-12">
              <h3>Recent carts:</h3>
            </div>
            {this.renderRecentCarts(carts)}
          </div>
          <div className="row">
            <div className="col-12">
              <h3>Most used products:</h3>
            </div>
          </div>
          <div className="row products-list">
            {this.renderProducts(products, categories)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ carts, products, categories }) {
  return {
    carts,
    products,
    categories
  };
}

export default connect(
  mapStateToProps,
  { setNavHeader }
)(Home);
