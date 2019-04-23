import "bootstrap/dist/css/bootstrap.min.css";
import "./components/styles/globalStyle.scss";
import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CartCreate from "./components/carts/CartCreate";
import Cart from "./components/carts/Cart";
import CartCollection from "./components/carts/CartCollection";
import MealCreate from "./components/meals/MealCreate";
import Meal from "./components/meals/Meal";
import MealCollection from "./components/meals/MealCollection";
import Calendar from "./components/calendar/Calendar";
import Day from "./components/calendar/Day";

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
            <Route path="/calendar/:day" component={Day} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/carts/create" component={CartCreate} />
            <Route path="/meals/create" component={MealCreate} />
            <Route path="/carts/:id" component={Cart} />
            <Route path="/meals/:id" component={Meal} />
            <Route path="/carts" component={CartCollection} />
            <Route path="/meals" component={MealCollection} />
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
