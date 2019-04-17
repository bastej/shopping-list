import "./AddProductForm.scss"
import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { addProduct, addCategory } from "../actions";
import ProductSearch from "./ProductSearchInput";

const AddProductForm = props => {

  const renderField = ({ input, placeholder, meta }) => {
    const className = `form-control ${meta.touched && meta.error ? "is-invalid" : ""}`;
    return (
      <div className="form-group">
        <input
          type={input.type}
          className={className}
          placeholder={placeholder}
          {...input}
        />
        <div className="text-danger">
          {meta.touched ? meta.error : ""}
        </div>
      </div>
    );
  };

  const onSubmit = values => {
    props.addProduct(values, listID);
    props.addCategory(values.category);
    props.reset("addProduct");
  };

  const { handleSubmit, listID } = props;
  return (
    <div className="add-product-form">
      <form
        onSubmit={handleSubmit(onSubmit)}// sprawdzic
        className="form-group"
      >
        <Field component={renderField} name="count" placeholder="Set count" type="number" />
        <Field
          component={renderField}
          name="category"
          placeholder="Choose category"
          type="text"
        />
        <ProductSearch />
        <button
          className="btn btn-green btn-block font-weight-bold"
          type="submit"
        >
          Add to List
        </button>
      </form>
    </div>
  );
};

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Enter a name!";
  }
  if (!values.category) {
    errors.category = "Enter a category!";
  }
  if (values.count < 1) {
    errors.count = "Enter value bigger than 0!";
  } else if (!values.count) {
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
  form: "addProduct", //nazwa formularza, jakby byl dwa na stronie zeby rozroznic
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
