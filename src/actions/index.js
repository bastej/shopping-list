import _ from "lodash";
import { nutritionixAPI } from "../api/nutritionix";

export const CREATE_NEW_LIST = "CREATE_NEW_LIST";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT_COUNT = "UDPATE_PRODUCT_COUNT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_LIST = "DELETE_LIST";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_NAV_HEADER = 'SET_NAV_HEADER';

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

  return async function(dispatch) {
    const response = await nutritionixAPI.get("/search/instant/",
      {
        params: {
          common_general: true,
          detailed: true,
          claims: true,
          branded: false,
          query: values.name
        }
      }
    );

    const responseData = response.data.common[0];
    const { food_name, photo, claims, serving_weight_grams, full_nutrients } = responseData;

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
    }

    dispatch({
      type: ADD_PRODUCT,
      payload
    });
  }
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

export function setNavHeader(text, tag) {
  return {
    type: SET_NAV_HEADER,
    payload: { text, tag }
  }
}