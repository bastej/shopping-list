import axios from "axios";
import _ from "lodash";

export const CREATE_NEW_LIST = "CREATE_NEW_LIST";
// export const FETCH_LISTS = "FETCH_LISTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT_COUNT = "UDPATE_PRODUCT_COUNT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_LIST = "DELETE_LIST";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const GET_SUGGESTIONS = "GET_SUGGESTIONS";

const API_KEY = "66dc95ac590ef97c7de66e82397a3853";
const APP_KEY = "6bbdffac";
const ROOT_URL = "https://trackapi.nutritionix.com/v2/search/instant";

export function createNewList(value) {
  const list = {
    title: value,
    createDate: new Date().toLocaleString()
  };
  return {
    type: CREATE_NEW_LIST,
    payload: list
  };
}

export function addProduct(values, listID) {
  let config = {
    headers: {
      "x-app-id": APP_KEY,
      "x-app-key": API_KEY,
      "x-remote-user-id": 0
    }
  };

  const query = values.name;

  const request = axios.get(
    `${ROOT_URL}?common_general=true&detailed=true&claims=true&branded=false&query=${query}`,
    config
  );

  return dispatch => {
    request.then(request => {
      const current_request = request.data.common[0];
      dispatch({
        type: ADD_PRODUCT,
        payload: {
          current_request,
          product: {
            name: current_request.food_name,
            photo: current_request.photo.thumb,
            tags: current_request.claims,
            serving_weight_grams: current_request.serving_weight_grams,
            calories: current_request.full_nutrients[
              _.findKey(current_request.full_nutrients, function(obj) {
                return obj.attr_id === 208;
              })
            ].value.toFixed(1),
            carbohydrates: current_request.full_nutrients[
              _.findKey(current_request.full_nutrients, function(obj) {
                return obj.attr_id === 205;
              })
            ].value.toFixed(1),
            proteins: current_request.full_nutrients[
              _.findKey(current_request.full_nutrients, function(obj) {
                return obj.attr_id === 203;
              })
            ].value.toFixed(1),
            fats: current_request.full_nutrients[
              _.findKey(current_request.full_nutrients, function(obj) {
                return obj.attr_id === 204;
              })
            ].value.toFixed(1),
            category: values.category,
            count: parseInt(values.count)
          },
          listID
        }
      });
    });
  };
}

export function addCategory(name) {
  return {
    type: ADD_CATEGORY,
    payload: name
  };
}

export function updateProductCount(listID, productID, type) {
  return {
    type: UPDATE_PRODUCT_COUNT,
    payload: {
      type,
      listID,
      productID
    }
  };
}

export function deleteProduct(listID, productID) {
  return {
    type: DELETE_PRODUCT,
    payload: {
      listID,
      productID
    }
  };
}

export function deleteList(listID) {
  return {
    type: DELETE_LIST,
    payload: { listID }
  };
}
