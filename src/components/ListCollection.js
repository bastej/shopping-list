import "./ListCollection.scss";
import React, { Component } from "react";
import _ from "lodash";
import ListSnippet from "./ListSnippet";

class ListCollection extends Component {
  renderLists = lists => {
    return _.map(lists, list => {
      return (
        <div key={list.id} className="col-12">
          <ListSnippet list={list} endpoint={`${list.type}s`} />
        </div>
      );
    });
  };

  render() {
    const { lists } = this.props;
    return (
      <div className="all-lists">
        <div className="container">
          <h3>Lists:</h3>
          <div className="row">{this.renderLists(lists)}</div>
        </div>
      </div>
    );
  }
}

export default ListCollection;
