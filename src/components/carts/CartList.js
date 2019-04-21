import "./CartList.scss";
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { setNavHeader } from "../../actions";
import CartSnippet from "./CartSnippet";

class CartList extends Component {
  
  componentDidMount() {
    this.props.setNavHeader("All carts", _.size(this.props.carts));
  }

  componentDidUpdate() {
    this.props.setNavHeader("All carts", _.size(this.props.carts));
  }

  render() { 
  const { carts } = this.props;
    return ( 
      <div className="all-lists">
        <div className="container">
          <h3>Carts:</h3>
          <div className="row">
            {_.map(carts, list => {
              return (
                <div key={list.id} className="col-12">
                  <CartSnippet list={list} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
     );
  }
}

function mapStateToProps({ carts }) {
  return {
    carts
  };
}

export default connect(
  mapStateToProps,
  { setNavHeader }
)(CartList);
