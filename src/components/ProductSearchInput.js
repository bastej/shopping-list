import "./ProductSearchInput.scss";
import React, { Component } from "react";
import _ from "lodash";
import { Field, change } from "redux-form";
import { connect } from "react-redux";
import { getProductsHints, clearProductsHints } from "../actions";

class productSearch extends Component {
  onInputChange = query => {
    if (query.length) {
      this.props.getProductsHints(query);
    } else {
      this.props.clearProductsHints();
    }
  };

  setSelected = value => {
    this.props.change("addProduct", "name", value);
    this.props.clearProductsHints();
  };

  renderHints = () => {
    return _.map(this.props.foods, (elem, index) => {
      return (
        <li
          onClick={e => this.setSelected(e.target.textContent)}
          key={index}
          id={"listbox-" + index}
          className="list-group-item"
        >
          {elem}
        </li>
      );
    });
  };

  renderProdSearch = ({ name, input, meta }) => {
    const className = `form-control ${
      meta.touched && meta.error ? "is-invalid" : ""
    }`;
    return (
      <React.Fragment>
        <input
          id="product-search"
          name={name}
          type="text"
          className={className}
          autoComplete="off"
          placeholder="Text product name"
          {...input}
        />
        <div className="text-danger">{meta.touched ? meta.error : ""}</div>
        <ul id="listbox" role="listbox" className="list-group">
          {meta.valid && this.renderHints()}
        </ul>
      </React.Fragment>
    );
  };

  render() {
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

const mapStateToProps = ({ productHints }) => {
  return {
    foods: productHints
  };
};

export default connect(
  mapStateToProps,
  { getProductsHints, clearProductsHints, change }
)(productSearch);
