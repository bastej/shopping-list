import {
  CREATE_NEW_LIST,
  ADD_PRODUCT,
  UPDATE_PRODUCT_COUNT,
  DELETE_PRODUCT,
  DELETE_LIST,
  GET_SUGGESTIONS
} from "../actions";

import _ from "lodash";

const INITIAL_LISTS = {
  0: {
    id: 0,
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
        count: 2,
        photo: "https://d2xdmhkmkbyw75.cloudfront.net/752_thumb.jpg"
      },
      1: {
        id: 1,
        name: "chleb",
        category: "bread",
        serving_weight_grams: 37,
        calories: 245,
        carbohydrates: 52.7,
        proteins: 8.0,
        fats: 0.3,
        count: 1
      },
      2: {
        id: 2,
        name: "mleko",
        category: "dairy",
        serving_weight_grams: 245,
        calories: 51,
        carbohydrates: 4.9,
        proteins: 3.3,
        fats: 2.0,
        count: 3
      },
      3: {
        id: 3,
        name: "mars",
        category: "sweets",
        serving_weight_grams: 53,
        calories: 452,
        carbohydrates: 70.3,
        proteins: 3.7,
        fats: 17.0,
        count: 10
      }
    }
  },
  1: {
    id: 1,
    title: "Test list 2",
    createDate: "1.11.1998",
    productsList: {
      0: { id: 0, name: "domestos", category: "chemistry", count: 4 },
      1: { id: 1, name: "mydło", category: "chemistry", count: 20 },
      2: { id: 2, name: "folia aluminiowa", category: "chemistry", count: 14 },
      4: {
        id: 4,
        name: "ser żółty",
        category: "dairy",
        serving_weight_grams: 28,
        calories: 380,
        carbohydrates: 0.1,
        proteins: 28.8,
        fats: 29.7,
        count: 918
      },
      5: {
        id: 5,
        name: "pomidor",
        category: "vegetables",
        serving_weight_grams: 123,
        calories: 19,
        carbohydrates: 2.9,
        proteins: 0.9,
        fats: 0.2,
        count: 234
      },
      6: {
        id: 6,
        name: "kurczak",
        category: "meat",
        serving_weight_grams: 85,
        calories: 187,
        carbohydrates: 0,
        proteins: 20,
        fats: 11,
        count: 33
      },
      7: {
        id: 7,
        name: "mleko",
        category: "dairy",
        serving_weight_grams: 245,
        calories: 51,
        carbohydrates: 4.9,
        proteins: 3.3,
        fats: 2.0,
        count: 23
      }
    }
  },
  2: {
    id: 2,
    title: "Test list 3",
    createDate: "1.11.2008",
    productsList: {
      0: { id: 0, name: "domestos", category: "chemistry", count: 4 },
      1: { id: 1, name: "mydło", category: "chemistry", count: 20 },
      2: {
        id: 2,
        name: "mleko",
        category: "dairy",
        serving_weight_grams: 221,
        calories: 77,
        carbohydrates: 20,
        proteins: 0.9,
        fats: 0.2,
        count: 43
      }
    }
  }
};

export default function(state = INITIAL_LISTS, action) {
  switch (action.type) {
    case CREATE_NEW_LIST: {
      const index = parseInt(_.findLastKey(state)) + 1 || 0;
      return { ...state, [index]: { id: index, ...action.payload } };
    }
    case ADD_PRODUCT: {
      const { product, listID } = action.payload;
      const productID =
        parseInt(_.findLastKey(state[listID].productsList)) + 1 || 0;
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
      return state;
    }
    case UPDATE_PRODUCT_COUNT: {
      const { listID, productID, type } = action.payload;
      const { count } = state[listID].productsList[productID];
      return {
        ...state,
        [listID]: {
          ...state[listID],
          productsList: {
            ...state[listID].productsList,
            [productID]: {
              ...state[listID].productsList[productID],
              count:
                type === "increment"
                  ? state[listID].productsList[productID].count + 1
                  : count > 0
                  ? count - 1
                  : 0
            }
          }
        }
      };
    }
    case DELETE_PRODUCT: {
      const { listID, productID } = action.payload;
      return {
        ...state,
        [listID]: {
          ...state[listID],
          productsList: _.omit(state[listID].productsList, productID)
        }
      };
    }
    case DELETE_LIST: {
      const { listID } = action.payload;
      return _.omit(state, listID);
    }
    default:
      return state;
  }
}
