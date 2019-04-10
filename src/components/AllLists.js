import "./AllLists.scss";
import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import SingleListPreview from "./SingleListPreview";

const AllLists = props => {
  const { lists } = props;
  return (
    <div className="all-lists">
      <Navbar lists={lists} />
      <div className="container">
        <h3>Lists:</h3>
        <div className="row">
          {_.map(lists, list => {
            return (
              <div key={list.id} className="col-12">
                <SingleListPreview list={list} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ lists }) {
  return {
    lists
  };
}

export default connect(
  mapStateToProps,
  {}
)(AllLists);
