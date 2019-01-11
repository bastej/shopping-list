import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Home from "./components/home";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faHome,
  faShoppingBasket,
  faPlus,
  faTimes,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";

import CreateListView from "./components/createListView";
import SingleList from "./components/single_list";
import allLists from "./components/allLists";
import "./components/styles/globalStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <BrowserRouter>
        <React.Fragment>
          <main>
            <Switch>
              <Route path="/lists/:id" component={SingleList} />
              <Route path="/lists" component={allLists} />
              <Route path="/createList" component={CreateListView} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
