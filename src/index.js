import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
// import Promise from "redux-promise";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};
let createStoreWithMiddleware;
if (
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
) {
  createStoreWithMiddleware = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
} else {
  createStoreWithMiddleware = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
