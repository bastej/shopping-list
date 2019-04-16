import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ListsReducer from "./reducer_lists";
import ProductsReducer from "./reducer_products";
import CategoriesReducer from "./reducer_categories";
import NavbarReducer from "./reducer_navbar";

const rootReducer = combineReducers({
  lists: ListsReducer,
  products: ProductsReducer,
  categories: CategoriesReducer,
  currentNavHeader: NavbarReducer,
  form: formReducer
});

export default rootReducer;
