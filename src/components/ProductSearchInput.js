import React, { Component } from "react";
import "./ProductSearchInput.scss";
import _ from "lodash";
import { nutritionixAPI } from "../api/nutritionix";
import { Field, change } from "redux-form";
import { connect } from "react-redux";

class productSearch extends Component {
  state = {
    foods: ""
  };

  onInputChange = query => {
    console.log("zapytanie do API");
    if (query.length) {
      this.getProductsHints(query);
    }
    // else {
    //   this.setState({ foods: "" });
    // }
  };

  getProductsHints = async query => {
    const request = await nutritionixAPI.get(`/search/instant/`, {
      params: {
        common_general: true,
        branded: false,
        query: query
      }
    });
    const foods = _.map(request.data.common, elem => elem.food_name);
    this.setState({ foods });
  };

  setSelected = value => {
    this.props.change("ProductsNewForm", "name", value);
    this.setState({ foods: "" });
  };

  renderProdSearch = field => {
    const className = `form-control ${
      field.meta.touched && field.meta.error ? "is-invalid" : ""
    }`;
    return (
      <React.Fragment>
        <input
          id="product-search"
          name="product"
          type="text"
          className={className}
          autoComplete="off"
          placeholder="Text product name"
          {...field.input}
        />
        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ""}
        </div>
        <ul id="listbox" role="listbox" className="list-group">
          {this.state.foods &&
            field.input.value &&
            _.map(this.state.foods, (elem, index) => {
              return (
                <li
                  onClick={e => this.setSelected(e.target.textContent)}
                  // onMouseOver={e => this.selectProduct(e.target.textContent)}
                  key={index}
                  id={"listbox-" + index}
                  className="list-group-item"
                >
                  {elem}
                </li>
              );
            })}
        </ul>
      </React.Fragment>
    );
  };

  render() {
    // alert("rendering...")
    const onInputChange = _.debounce(query => {
      this.onInputChange(query);
    }, 800);
    return (
      <div className="product-search form-group">
        <Field
          onChange={event => onInputChange(event.target.value)}
          name="name"
          placeholder="Text product name"
          component={this.renderProdSearch}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { change }
)(productSearch);
