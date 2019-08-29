import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

describe("<Cart />", () => {
  const mockStore = configureStore();

  it("renders and matches the snapshot", () => {
    const text = "I am single cart!";
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Cart>{text}</Cart>
        </Router>
      </Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("handles clicks", () => {});
});
// nie dziala do poprawy
