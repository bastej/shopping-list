import "./ListCreator.scss";
import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AddProductForm from "./AddProductForm";
import { setNavHeader } from "../actions";

class ListCreator extends Component {
  componentDidMount() {
    this.props.setNavHeader(
      this.props.list.title,
      _.size(this.props.list.productsList)
    );
  }

  componentDidUpdate() {
    this.props.setNavHeader(
      this.props.list.title,
      _.size(this.props.list.productsList)
    );
  }

  render() {
    const { list, categories } = this.props;
    if (!list) {
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
                  <AddProductForm
                    listID={this.props.list.id}
                    listType={list.type}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row products-list">
            <div className="col">
              <ul className="list-group">
                {this.props.renderProducts(list, categories)}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, categories }) => {
  return {
    products,
    categories
  };
};

export default connect(
  mapStateToProps,
  { setNavHeader }
)(ListCreator);
