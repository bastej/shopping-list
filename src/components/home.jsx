import React, { Component } from "react";
import _ from "lodash";
import $ from "jquery";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteList } from "../actions";
import "./styles/home.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./navbar";

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
    const { lists, products, deleteList, categories } = this.props;
    return (
      <div className="home">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="/createList" className="btn btn-success btn-lg btn-block btnAddList">
                <FontAwesomeIcon className="fa-sm" icon="plus" /> Create new
                list
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h3>Recent lists:</h3>
            </div>
            {_.map(lists, list => {
              return (
                <div key={list.id} className="col-12 col-lg-4">
                  <div className="homeListTile bg-light">
                      <h4>{list.title}</h4>
                      <hr />
                      <div className="badge badge-warning">
                        Products: {_.size(list.productsList) || 0}{" "}
                      </div>
                      <div title="Created">
                        <FontAwesomeIcon className="fa-sm" icon="calendar" />{" "}
                        {list.createDate}
                      </div>
                    <button
                      onClick={() => deleteList(list.id)}
                      className="btn btn-sm btn-danger btnDelete"
                      title="Delete"
                    >
                      <FontAwesomeIcon className="fa-md" icon="times" />
                    </button>
                    <Link to={`/lists/${list.id}`} className="btn btn-primary btn-block btnOpenList">
                      Open list
                    </Link>
                    <div>
                      {/* kcal: {product.calories} | w: {product.carbohydrates} | b:{" "}
                    {product.proteins} | t: {product.fats} */}
                    </div>
                  </div>
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
              console.log("match: ", match);

              return (
                <div
                  key={product.id}
                  data-category={product.category}
                  className="col-12 col-md-6 col-lg-3"
                >
                  <div
                    className="product"
                    style={
                      product.photo && {
                        background: "url(" + product.photo + ")"
                      }
                    }
                  >
                    <div className="badge badge-info badge-times">
                      {product.usageCount} <br /> times
                    </div>
                    {/* {product.photo && (
                      <img className="productImg" src={product.photo} />
                    )} */}
                    <h6 className="name">{product.name} </h6>
                    <div className="badge badge-category">
                      {product.category + " "}
                      <img src={match.img} className="categoryImg" />
                    </div>

                    {product.category !== "chemistry" &&
                      product.category !== "frozen-food" && (
                        <div>
                          <div>
                            <FontAwesomeIcon
                              data-switch="false"
                              className="fa-lg nutrientsSwitch"
                              icon="angle-down"
                            />
                          </div>
                          <div className="nutrients">
                            <div className="float-right nutrients_info">
                              w {product.serving_weight_grams || "--"} g/ml
                            </div>
                            <div className="nutrients_kcal">
                              cal: {product.calories || "0"}
                            </div>
                            <div className="nutrients_w">
                              c: {product.carbohydrates || "0"}
                            </div>
                            <div className="nutrients_b">
                              p: {product.proteins || "0"}
                            </div>
                            <div className="nutrients_t">
                              f: {product.fats || "0"}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
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
  { deleteList }
)(Home);
