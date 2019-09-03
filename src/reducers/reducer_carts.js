import {
  CREATE_NEW_CART,
  DELETE_CART,
  ADD_CART_PRODUCT,
  UPDATE_CART_PRODUCT_COUNT,
  DELETE_CART_PRODUCT
} from "../actions/types";

import _ from "lodash";

export const INITIAL_CARTS = {
  0: {
    id: 0,
    type: "cart",
    title: "Christmas shopping",
    createDate: "04.09.2018",
    productsList: {
      0: {
        id: 0,
        name: "potato",
        category: "vegetables",
        serving_weight_grams: 173,
        calories: 161,
        carbohydrates: 36.6,
        proteins: 4.3,
        fats: 0.2,
        tags: [
          "Cholesterol Free",
          "Fat Free",
          "Good Source of Fiber",
          "Saturated Fat Free",
          "Very Low Sodium"
        ],
        count: 10,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/752_thumb.jpg"
      },
      1: {
        id: 1,
        name: "salmon",
        category: "meat",
        serving_weight_grams: 227,
        calories: 468,
        carbohydrates: 0.0,
        proteins: 50.2,
        fats: 28.0,
        tags: [
          "Atkins 20",
          "Atkins 40",
          "Atkins 100",
          "Atkins Friendly",
          "Low Carb",
          "High Protein",
          "Very Low Sodium",
          "Sugar Free"
        ],
        count: 1,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/375_thumb.jpg"
      },
      2: {
        id: 2,
        name: "cheese",
        category: "dairy",
        serving_weight_grams: 112,
        calories: 452,
        carbohydrates: 3.6,
        proteins: 25.6,
        fats: 37.2,
        tags: [
          "Atkins 20",
          "Atkins 40",
          "Atkins 100",
          "Atkins Friendly",
          "Low Carb",
          "Ketogenic Diet",
          "Good Source of Protein",
          "Sugar Free"
        ],
        count: 3,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/1034_thumb.jpg"
      },
      3: {
        id: 3,
        name: "onion",
        category: "vegetables",
        serving_weight_grams: 94,
        calories: 41,
        carbohydrates: 9.5,
        proteins: 1.3,
        fats: 0.2,
        tags: [
          "Low Calorie",
          "Cholesterol Free",
          "Fat Free",
          "Saturated Fat Free",
          "Sodium Free"
        ],
        count: 5,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/717_thumb.jpg"
      }
    }
  },
  1: {
    id: 1,
    type: "cart",
    title: "For kitchen",
    createDate: "21.11.2018",
    productsList: {
      0: {
        id: 0,
        name: "sugar",
        category: "sweets",
        serving_weight_grams: 4.2,
        calories: 16,
        carbohydrates: 4.2,
        proteins: 0.0,
        fats: 0.0,
        tags: [
          "Cholesterol Free",
          "Fat Free",
          "Low Saturated Fat",
          "Sodium Free"
        ],
        count: 4,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/834_thumb.jpg"
      },
      1: {
        id: 1,
        name: "oil",
        category: "other",
        serving_weight_grams: 14,
        calories: 124,
        carbohydrates: 0.0,
        proteins: 0.0,
        fats: 14.0,
        tags: [
          "Atkins 20",
          "Atkins 40",
          "Atkins 100",
          "Atkins Friendly",
          "Low Carb",
          "Cholesterol Free",
          "Ketogenic Diet",
          "Low Saturated Fat",
          "Sodium Free",
          "Sugar Free"
        ],
        count: 4,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/1031_thumb.jpg"
      },
      2: {
        id: 2,
        name: "flour",
        category: "other",
        serving_weight_grams: 125,
        calories: 455,
        carbohydrates: 95.4,
        proteins: 12.9,
        fats: 1.2,
        tags: [
          "Cholesterol Free",
          "Low Carb",
          "Good Source of Fiber",
          "High Protein",
          "Low Saturated Fat",
          "Sodium Free",
          "Sugar Free"
        ],
        count: 14,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/206_thumb.jpg"
      }
    }
  },
  2: {
    id: 2,
    type: "cart",
    title: "Protein shake",
    createDate: "1.11.2008",
    productsList: {
      0: {
        id: 0,
        name: "banana",
        category: "fruits",
        serving_weight_grams: 118,
        calories: 105,
        carbohydrates: 27.0,
        proteins: 1.3,
        fats: 0.4,
        tags: [
          "Cholesterol Free",
          "Fat Free",
          "Good Source of Fiber",
          "Saturated Fat Free",
          "Sodium Free"
        ],
        count: 2,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/399_thumb.jpg"
      },
      1: {
        id: 1,
        name: "2% milk",
        category: "dairy",
        serving_weight_grams: 244,
        calories: 122,
        carbohydrates: 11.7,
        proteins: 8.1,
        fats: 4.8,
        tags: [
          "Low Carb",
          "Low Cholesterol",
          "Low Fat",
          "Good Source of Protein",
          "Very Low Sodium"
        ],
        count: 1,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/9337_thumb.jpg"
      },
      2: {
        id: 2,
        name: "oat",
        category: "other",
        serving_weight_grams: 40.5,
        calories: 153,
        carbohydrates: 27.4,
        proteins: 5.3,
        fats: 2.6,
        tags: [
          "Cholesterol Free",
          "Good Source of Fiber",
          "Good Source of Protein",
          "Low Saturated Fat",
          "Sodium Free",
          "Sugar Free"
        ],
        count: 1,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/712_thumb.jpg"
      },
      3: {
        id: 3,
        name: "eggs",
        category: "dairy",
        serving_weight_grams: 50,
        calories: 72,
        carbohydrates: 0.4,
        proteins: 6.3,
        fats: 4.8,
        tags: [
          "Atkins 20",
          "Atkins 40",
          "Atkins 100",
          "Atkins Friendly",
          "Low Carb",
          "Good Source of Protein",
          "Low Sodium",
          "Sugar Free"
        ],
        count: 2,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/775_thumb.jpg"
      },
      4: {
        id: 4,
        name: "cottage cheese",
        category: "dairy",
        serving_weight_grams: 108.75,
        calories: 107,
        carbohydrates: 3.7,
        proteins: 12.1,
        fats: 4.7,
        tags: [
          "Atkins 100",
          "Atkins Friendly",
          "Low Carb",
          "Low Cholesterol",
          "Low Fat",
          "High Protein"
        ],
        count: 2,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/510_thumb.jpg"
      }
    }
  }
};

export default function(state = INITIAL_CARTS, action) {
  switch (action.type) {
    case CREATE_NEW_CART: {
      const index = _.size(state) || 0;
      return { ...state, [index]: { id: index, ...action.payload } };
    }
    case ADD_CART_PRODUCT: {
      const { product, listID } = action.payload;
      const productID = _.size(state[listID].productsList) || 0;
      return {
        ...state,
        [listID]: {
          ...state[listID],
          productsList: {
            ...state[listID].productsList,
            [productID]: {
              id: productID,
              ...product
            }
          }
        }
      };
    }
    case UPDATE_CART_PRODUCT_COUNT: {
      const { listID, productID, actionType } = action.payload;
      const { count } = state[listID].productsList[productID];
      const { productsList } = state[listID];
      return {
        ...state,
        [listID]: {
          ...state[listID],
          productsList: {
            ...productsList,
            [productID]: {
              ...productsList[productID],
              count:
                actionType === "increment"
                  ? count + 1
                  : count > 0
                  ? count - 1
                  : 0
            }
          }
        }
      };
    }
    case DELETE_CART_PRODUCT: {
      const { listID, productID } = action.payload;
      return {
        ...state,
        [listID]: {
          ...state[listID],
          productsList: _.omit(state[listID].productsList, productID)
        }
      };
    }
    case DELETE_CART: {
      const { cartID } = action.payload;
      return _.omit(state, cartID);
    }
    default:
      return state;
  }
}
