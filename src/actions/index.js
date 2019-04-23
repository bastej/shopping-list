import _ from "lodash";
import { nutritionixAPI } from "../api/nutritionix";
import {
  CREATE_NEW_CART,
  DELETE_CART,
  ADD_CART_PRODUCT,
  UPDATE_CART_PRODUCT_COUNT,
  DELETE_CART_PRODUCT,
  ADD_CATEGORY,
  SET_NAV_HEADER,
  GET_PRODUCT_HINTS,
  CLEAR_PRODUCT_HINTS,
  CALCULATE_NUTRIENTS,
  CREATE_NEW_MEAL,
  DELETE_MEAL,
  ADD_MEAL_PRODUCT,
  UPDATE_MEAL_PRODUCT_COUNT,
  DELETE_MEAL_PRODUCT
} from "./types";

export const createNewCart = (value, history) => dispatch => {
  const cart = {
    title: value,
    type: "cart",
    createDate: new Date().toLocaleString()
  };
  dispatch({ type: CREATE_NEW_CART, payload: cart });
  history.push("/");
};

export function deleteCart(cartID) {
  return {
    type: DELETE_CART,
    payload: { cartID }
  };
}

export const addProduct = (values, listID, listType) => async dispatch => {
  const type = listType === "cart" ? ADD_CART_PRODUCT : ADD_MEAL_PRODUCT;

  const response = await nutritionixAPI.get("/search/instant/", {
    params: {
      common_general: true,
      detailed: true,
      claims: true,
      branded: false,
      query: values.name
    }
  });

  const responseData = response.data.common[0];
  const {
    food_name,
    photo,
    claims,
    serving_weight_grams,
    full_nutrients
  } = responseData;

  const payload = {
    responseData,
    product: {
      name: food_name,
      photo: photo.thumb,
      tags: claims,
      serving_weight_grams: serving_weight_grams,
      calories: full_nutrients[
        //find obj key by attr_id prop and return obj value prop
        _.findKey(full_nutrients, el => el.attr_id === 208)
      ].value.toFixed(0),
      carbohydrates: full_nutrients[
        _.findKey(full_nutrients, el => el.attr_id === 205)
      ].value.toFixed(1),
      proteins: full_nutrients[
        _.findKey(full_nutrients, el => el.attr_id === 203)
      ].value.toFixed(1),
      fats: full_nutrients[
        _.findKey(full_nutrients, el => el.attr_id === 204)
      ].value.toFixed(1),
      category: values.category,
      count: parseInt(values.count)
    },
    listID
  };

  dispatch({ type, payload });
};

export function deleteProduct(listID, productID, listType) {
  const type = listType === "cart" ? DELETE_CART_PRODUCT : DELETE_MEAL_PRODUCT;

  return {
    type,
    payload: {
      listID,
      productID
    }
  };
}

export function updateProductCount(listID, productID, actionType, listType) {
  const type =
    listType === "cart" ? UPDATE_CART_PRODUCT_COUNT : UPDATE_MEAL_PRODUCT_COUNT;

  return {
    type,
    payload: {
      actionType,
      listID,
      productID
    }
  };
}

export const getProductsHints = query => async dispatch => {
  const request = await nutritionixAPI.get(`/search/instant/`, {
    params: {
      common_general: true,
      branded: false,
      query: query
    }
  });
  const payload = _.map(request.data.common, elem => elem.food_name);

  dispatch({ type: GET_PRODUCT_HINTS, payload });
};

export function clearProductsHints() {
  return {
    type: CLEAR_PRODUCT_HINTS
  };
}

export function addCategory(name) {
  return {
    type: ADD_CATEGORY,
    payload: name
  };
}

export function setNavHeader(text, tag) {
  return {
    type: SET_NAV_HEADER,
    payload: { text, tag }
  };
}

export function calculateNutrients(productsList) {
  let calories = 0,
    carbohydrates = 0,
    proteins = 0,
    fats = 0;
  _.map(productsList, product => {
    product.calories && (calories += product.calories * product.count);
    product.carbohydrates &&
      (carbohydrates += product.carbohydrates * product.count);
    product.proteins && (proteins += product.proteins * product.count);
    product.fats && (fats += product.fats * product.count);
  });

  return {
    type: CALCULATE_NUTRIENTS,
    payload: { calories, carbohydrates, proteins, fats }
  };
}

export const createNewMeal = (value, history) => dispatch => {
  const cart = {
    title: value,
    type: "meal",
    createDate: new Date().toLocaleString()
  };
  dispatch({ type: CREATE_NEW_MEAL, payload: cart });
  history.push("/");
};

export function deleteMeal(mealID) {
  return {
    type: DELETE_MEAL,
    payload: { mealID }
  };
}
