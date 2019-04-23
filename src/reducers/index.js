import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import CartsReducer from "./reducer_carts";
import MealsReducer from "./reducer_meals";
import ProductsReducer from "./reducer_products";
import CategoriesReducer from "./reducer_categories";
import NavbarReducer from "./reducer_navbar";
import ProductHintsReducer from "./reducer_productHints";
import CurrentListNutrientsReducer from "./reducer_currentListNutrients";

const rootReducer = combineReducers({
  carts: CartsReducer,
  meals: MealsReducer,
  products: ProductsReducer,
  categories: CategoriesReducer,
  currentNavHeader: NavbarReducer,
  form: formReducer,
  productHints: ProductHintsReducer,
  currentListNutrients: CurrentListNutrientsReducer
});

export default rootReducer;
