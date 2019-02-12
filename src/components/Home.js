import React, { Component } from "react";
import _ from "lodash";
import $ from "jquery";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import Product from "./Product";
import SingleListPreview from "./SingleListPreview";

class Home extends Component {
  componentDidMount() {
    $(".product .nutrientsSwitch").click(function() {
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
    const threeLastestList = _.filter(lists, (el, index) => {
      return index > _.size(lists) - 4;
    }); //get 3 latest list
    return (
      <div className="home">
        <Navbar />
        <div className="container">
          <Link
            to="/createList"
            className="btn btn-green btnAddList text-white font-weight-bold"
          >
            <p>Create new list</p>
            <FontAwesomeIcon className="fa-lg" icon="plus" />
          </Link>
          <div className="row">
            <div className="col-12">
              <h3>Recent lists:</h3>
            </div>
            {_.map(threeLastestList, list => {
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
          <div className="row productsList">
            {_.map(products, product => {
              let match = _.find(categories, { name: product.category });
              return (
                <Product
                  key={product.id}
                  product={product}
                  match={match}
                  parentComponent={"Home"}
                />
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
  {}
)(Home);
