import "./Home.scss";
import React, { Component } from "react";
import _ from "lodash";
import $ from "jquery";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Product from "./Product";
import SingleListPreview from "./lists/SingleListSnippet";
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
    const { lists, products, categories } = this.props;
    //get 3 latest list
    const lastestList = _.filter(lists, (el, index) => {
      return index > _.size(lists) - 4;
    });
    return (
      <div className="home">
        <div className="container">
          <Link
            to="/lists/create"
            className="btn btn-green btn-add-list text-white font-weight-bold"
          >
            <p>Create new list</p>
            <FontAwesomeIcon className="fa-lg" icon="plus" />
          </Link>
          <div className="row">
            <div className="col-12">
              <h3>Recent lists:</h3>
            </div>
            {_.map(lastestList, list => {
              return (
                <div key={list.id} className="col-12 col-lg-4">
                  <SingleListPreview list={list} />
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

function mapStateToProps({ lists, products, categories }) {
  return {
    lists,
    products,
    categories
  };
}

export default connect(
  mapStateToProps,
  { setNavHeader }
)(Home);
