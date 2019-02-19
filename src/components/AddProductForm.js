import React from "react";
import _ from "lodash";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { addProduct, addCategory } from "../actions";
import ProductSearch from "./ProductSearchInput";

const AddProductForm = props => {
  const renderField = field => {
    const className = `form-control ${
      field.meta.touched && field.meta.error ? "is-invalid" : ""
    }`;
    return (
      <div className="form-group">
        <input
          type={field.input.name === "count" ? "number" : "text"}
          list={field.list || ""}
          className={className}
          placeholder={field.placeholder}
          {...field.input}
        />

        <div className="text-danger">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    );
  };

  const onSubmit = values => {
    props.addProduct(values, listID);
    props.addCategory(values.category);
    props.reset("ProductsNewForm");
  };

  const { categories, handleSubmit, listID } = props;
  console.log("props:", props);
  return (
    <form
      onSubmit={handleSubmit(onSubmit.bind(this))}
      className="form-group"
      id="test1"
    >
      <Field component={renderField} name="count" placeholder="Set count" />
      <Field
        component={renderField}
        list="categories"
        name="category"
        placeholder="Choose category"
      />
      <ProductSearch />

      <datalist id="categories" style={{ width: "100%" }}>
        {_.map(categories, category => {
          return <option key={category.id} value={category.name} />;
        })}
      </datalist>

      <button
        className="btn btn-green btn-block font-weight-bold"
        type="submit"
      >
        Add to List
      </button>
    </form>
  );
};

function validate(values) {
  console.log("validacja: ", values);
  const errors = {};
  if (!values.name) {
    errors.name = "Enter a name!";
  }
  if (!values.category) {
    errors.category = "Enter a category!";
  }
  if (values.count < 1) {
    errors.count = "Enter value bigger than 0!";
  }
  if (!values.count) {
    errors.count = "Enter a count!";
  }
  return errors;
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

export default reduxForm({
  validate,
  form: "ProductsNewForm", //nazwa formularza, jakby byl dwa na stronie zeby rozroznic
  fields: ["count", "category", "name"]
})(
  connect(
    mapStateToProps,
    {
      addProduct,
      addCategory,
      reset
    }
  )(AddProductForm)
);
