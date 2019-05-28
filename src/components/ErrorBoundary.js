import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return <div>Something wrong</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
