import React, { Component } from "react";
import "./styles/productSearch.sass";
import _ from "lodash";
import axios from "axios";
import { Field, change } from "redux-form";
import { connect } from "react-redux";

const API_KEY = "66dc95ac590ef97c7de66e82397a3853";
const APP_KEY = "6bbdffac";
const ROOT_URL = "https://trackapi.nutritionix.com/v2/search/instant";

class productSearch extends Component {
  state = {
    foods: ""
  };

  onInputChange = query => {
    console.log("zapytanie do API");
    if (query.length) {
      this.getProductsSuggestions(query);
    }
    // else {
    //   this.setState({ foods: "" });
    // }
  };

  getProductsSuggestions(query) {
    let config = {
      headers: {
        "x-app-id": APP_KEY,
        "x-app-key": API_KEY,
        "x-remote-user-id": 0
      }
    };
    const request = axios.get(
      `${ROOT_URL}?common_general=true&detailed=true&claims=true&branded=false&query=${query}`,
      config
    );
    request.then(request => {
      const current_request = request.data.common;
      const foods = _.map(current_request, elem => elem.food_name);
      this.setState({ foods });
    });
  }

  setSelected = (value) => {
    // this.setState({ selected: value })
    this.props.change("ProductsNewForm", 'name', value);
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
          id="productSearch"
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
          {/*field.meta.active &&*/
          this.state.foods &&
            field.input.value &&
            _.map(this.state.foods, (elem, index) => {
              return (
                <li
                  onClick={e => this.setSelected(e.target.textContent)}
                  // onMouseOver={e => this.selectProduct(e.target.textContent)}
                  key={index}
                  role="option"
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
      <div className="productSearch form-group">
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

export default connect(null, {change})(productSearch);
