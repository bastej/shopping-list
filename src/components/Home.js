import "./Home.scss";
import React, { Component } from "react";
import _ from "lodash";
import $ from "jquery";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "./Product";
import CartSnippet from "./carts/CartSnippet";
import { setNavHeader } from '../actions';

class Home extends Component {

  componentDidMount() {
    this.props.setNavHeader('Shopping list App'); 
    
    $(".product .nutrients-switch").click(function() {
      const box = this.parentElement.parentElement.querySelector(".nutrients");
      if ($(this).attr("data-switch") === "false") {
        $(this)
          .attr("data-switch", "true")
          .css("transform", "rotateX(180deg)");
        $(box).css("height", "80px");
      } else {
        $(this)
          .attr("data-switch", "false")
          .css("transform", "rotateX(0deg)");
        $(box).css("height", "0");
      }
    });
  }

  render() {
    const { carts, products, categories } = this.props;
    //get 3 latest list
    const lastestCarts = _.filter(carts, (el, index) => {
      return index > _.size(carts) - 4;
    });
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
            {_.map(lastestCarts, cart=> {
              return (
                <div key={cart.id} className="col-12 col-lg-4">
                  <CartSnippet cart={cart} />
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-12">
              <h3>Most used products:</h3>
            </div>
          </div>
          <div className="row products-list">
            {_.map(products, product => {
              let match = _.find(categories, { name: product.category });
              return (
                <div
                  key={product.id}
                  data-category={product.category}
                  className="col-12 col-md-6 col-lg-3"
                >
                  <Product
                    key={product.id}
                    product={product}
                    match={match}
                    parentComponent={"Home"}
                  />
                </div>
              );
            })}
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
