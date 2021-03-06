import { ADD_CART_PRODUCT, ADD_MEAL_PRODUCT } from "../actions/types";
import _ from "lodash";

const INITIAL_PORDUCTS = {
  0: {
    id: 0,
    name: "potato",
    category: "vegetables",
    serving_weight_grams: 173,
    calories: 161,
    carbohydrates: 36.6,
    proteins: 4.3,
    fats: 0.2,
    count: 10,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/752_thumb.jpg",
    usageCount: 1
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
    usageCount: 1,
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
    usageCount: 1,
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
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/717_thumb.jpg"
  },
  4: {
    id: 4,
    name: "sugar",
    category: "sweets",
    serving_weight_grams: 4.2,
    calories: 16,
    carbohydrates: 4.2,
    proteins: 0.0,
    fats: 0.0,
    tags: ["Cholesterol Free", "Fat Free", "Low Saturated Fat", "Sodium Free"],
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/834_thumb.jpg"
  },
  5: {
    id: 5,
    name: "oil",
    category: "other",
    serving_weight_grams: 14,
    calories: 124,
    carbohydrates: 0.0,
    proteins: 0.0,
    fats: 14.0,
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/1031_thumb.jpg"
  },
  6: {
    id: 6,
    name: "flour",
    category: "other",
    serving_weight_grams: 125,
    calories: 455,
    carbohydrates: 95.4,
    proteins: 12.9,
    fats: 1.2,
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/206_thumb.jpg"
  },
  7: {
    id: 7,
    name: "banana",
    category: "fruits",
    serving_weight_grams: 118,
    calories: 105,
    carbohydrates: 27.0,
    proteins: 1.3,
    fats: 0.4,
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/399_thumb.jpg"
  },
  8: {
    id: 8,
    name: "2% milk",
    category: "dairy",
    serving_weight_grams: 244,
    calories: 122,
    carbohydrates: 11.7,
    proteins: 8.1,
    fats: 4.8,
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/9337_thumb.jpg"
  },
  9: {
    id: 9,
    name: "oat",
    category: "other",
    serving_weight_grams: 40.5,
    calories: 153,
    carbohydrates: 27.4,
    proteins: 5.3,
    fats: 2.6,
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/712_thumb.jpg"
  },
  10: {
    id: 10,
    name: "eggs",
    category: "dairy",
    serving_weight_grams: 50,
    calories: 72,
    carbohydrates: 0.4,
    proteins: 6.3,
    fats: 4.8,
    usageCount: 2,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/775_thumb.jpg"
  },
  11: {
    id: 11,
    name: "cottage cheese",
    category: "dairy",
    serving_weight_grams: 108.75,
    calories: 107,
    carbohydrates: 3.7,
    proteins: 12.1,
    fats: 4.7,
    usageCount: 1,
    photo: "https://d2xdmhkmkbyw75.cloudfront.net/510_thumb.jpg"
  }
};

export default function(state = INITIAL_PORDUCTS, action) {
  switch (action.type) {
    case ADD_CART_PRODUCT || ADD_MEAL_PRODUCT: {
      const index = _.size(state);
      const { product } = action.payload;
      //check if product exist
      const match = _.find(state, { name: product.name });
      if (match) {
        //note that prod used one more time
        return {
          ...state,
          [match.id]: {
            ...state[match.id],
            usageCount: state[match.id].usageCount + 1
          }
        };
      } else {
        //add prod to list of all products
        return {
          ...state,
          [index]: {
            id: index,
            usageCount: 1,
            ...product
          }
        };
      }
    }
    default:
      return state;
  }
}
