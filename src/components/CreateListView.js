import "./CreateListView.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

import { createNewList } from "../actions";
import { setNavHeader } from "../actions";

class CreateListView extends Component {
  state = {
    newListName: ""
  };

  componentDidMount() {
    this.props.setNavHeader('Create shopping list');
  }

  renderInput = ({ input, placeholder, meta }) => {
    const className = `form-control ${meta.touched && meta.error ? "is-invalid" : ""}`;
    return (
      <div className="form-group">
        <input
          type={input.type}
          className={className}
          placeholder={placeholder}
          autoComplete="off"
          {...input}
        />
        <div className="text-danger">
          {meta.touched ? meta.error : ""}
        </div>
      </div>
    );
  };

  onSubmit = ({title}) => {
    this.props.createNewList(title);
    this.props.history.goBack();
    alert("List created successfully");
  }

  render() {
    return (
      <div className="create-new-list">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 offset-lg-3">
              <div className="card">
                <div className="card-header bg-lightblue text-white">
                  <h4>Create new list</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Entry list title"
                      component={this.renderInput}
                    />
                    <button
                      type="submit"
                      className="btn btn-green btn-lg btn-block"
                    >
                      Create
                    </button>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "createList"
})( 
  connect(
    null,
    { createNewList, setNavHeader }
  )(CreateListView)
);