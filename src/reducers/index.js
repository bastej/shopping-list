import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import ListsReducer from "./reducer_lists";
import ProductsReducer from "./reducer_products";
import CategoriesReducer from "./reducer_categories";

const rootReducer = combineReducers({
  lists: ListsReducer,
  products: ProductsReducer,
  categories: CategoriesReducer,
  form: formReducer
});

export default rootReducer;
