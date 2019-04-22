import "./Cart.scss";
import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Product from "../Product";
import AddProductForm from "../AddProductForm";
import NutrientsTable from "../NutrientsTable";
import { setNavHeader, calculateNutrients } from '../../actions';

class Cart extends Component {
  
  componentDidMount() {
    this.props.setNavHeader(this.props.cart.title, _.size(this.props.cart.productsList));
  }

  componentDidUpdate() {
    this.props.setNavHeader(this.props.cart.title, _.size(this.props.cart.productsList));
    this.props.calculateNutrients(this.props.cart.productsList);
  }

  renderProducts = (cart, categories) => {
    return _.map(cart.productsList, product => {
      let match = _.find(categories, { name: product.category });
      return (
        <li key={product.id} className="list-group-item">
          <Product
            product={product}
            cart={cart}
            match={match}
          />
      </li>
      );
    })
  }

  render() {
    const { cart, categories } = this.props;
    if (!cart) {
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
                  <AddProductForm cartID={this.props.match.params.id} />
                </div>
              </div>
            </div>
          </div>
          <div className="row products-list">
            <div className="col">
              <ul className="list-group">
                {this.renderProducts(cart, categories)}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <NutrientsTable productsList={cart.productsList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ carts, products, categories }, ownProps) => {
  return {
    cart: carts[ownProps.match.params.id],
    products,
    categories
  };
}

export default connect(
  mapStateToProps,
  { setNavHeader, calculateNutrients }
)(Cart);
