import "./components/styles/globalStyle.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import CreateListView from "./components/CreateListView";
import SingleList from "./components/SingleList";
import AllLists from "./components/AllLists";
import Navbar from "./components/Navbar";

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
      <BrowserRouter>
          <main>
            <Navbar />
            <Switch>
              <Route path="/lists/:id" component={SingleList} />
              <Route path="/lists" component={AllLists} />
              <Route path="/createList" component={CreateListView} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
      </BrowserRouter>
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
