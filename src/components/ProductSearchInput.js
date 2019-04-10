import React, { Component } from "react";
import "./ProductSearchInput.scss";
import _ from "lodash";
import { nutritionixHints } from "../api/nutritionix";
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
    const request = await nutritionixHints.get(`/search/instant/`, {
      params: {
        common_general: true,
        detailed: true,
        claims: true,
        branded: false,
        query: query
      }
    });
    const foods = _.map(request.data.common, elem => elem.food_name);
    this.setState({ foods });
  };

  setSelected = value => {
    // this.setState({ selected: value })
    this.props.change("ProductsNewForm", "name", value);
    // this.state.selected && (document.querySelector("input#productSearch").value = this.state.selected)
    // alert("state val" + this.state.selected + "przekazane do fnkc" + value + "pole" + document.querySelector("input#productSearch").value)
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
          onBlur={() => this.setState({foods: ''})}
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
