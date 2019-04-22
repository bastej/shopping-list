import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/globalStyle.scss";
import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CartCreate from "./components/carts/CartCreate";
import Cart from "./components/carts/Cart";
import CartList from "./components/carts/CartList";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp,
  faAngleDown,
  faHome,
  faShoppingBasket,
  faPlus,
  faTimes,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faAngleUp,
  faAngleDown,
  faHome,
  faShoppingBasket,
  faPlus,
  faTimes,
  faCalendar
);

class App extends Component {
  render() {
    return (
      <HashRouter>
          <main>
            <Navbar />
            <Switch>
              <Route path="/carts/create" component={CartCreate} />
              <Route path="/carts/:id" component={Cart} />
              <Route path="/carts" component={CartList} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
      </HashRouter>
    );
  }
}

export default App;

/*
Template

class: .some-class
Components file name: FileName
Style file name: FileName
reducers file name: reducer_first
actions file name: action_default
zmienne js: sameVar
*/
