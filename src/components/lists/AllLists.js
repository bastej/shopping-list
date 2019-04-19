import "./AllLists.scss";
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { setNavHeader } from "../../actions";
import SingleListPreview from "./SingleListSnippet";

class AllLists extends Component {
  
  componentDidMount() {
    this.props.setNavHeader("All lists", _.size(this.props.lists));
  }

  componentDidUpdate() {
    this.props.setNavHeader("All lists", _.size(this.props.lists));
  }

  render() { 
  const { lists } = this.props;
    return ( 
      <div className="all-lists">
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
  }
}

function mapStateToProps({ lists }) {
  return {
    lists
  };
}

export default connect(
  mapStateToProps,
  { setNavHeader }
)(AllLists);
