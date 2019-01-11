import { ADD_PRODUCT } from "../actions";
import _ from "lodash";

const INITIAL_PORDUCTS = {
  0: {
    id: 0,
    name: "banan",
    category: "fruits",
    calories: 97,
    carbohydrates: 21.8,
    proteins: 1.0,
    fats: 0.3,
    usageCount: 1
  },
  1: {
    id: 1,
    name: "chleb",
    category: "bread",
    calories: 245,
    carbohydrates: 52.7,
    proteins: 8.0,
    fats: 0.3,
    usageCount: 1
  },
  2: {
    id: 2,
    name: "mleko",
    category: "dairy",
    calories: 51,
    carbohydrates: 4.9,
    proteins: 3.3,
    fats: 2.0,
    usageCount: 3
  },
  3: {
    id: 3,
    name: "mars",
    category: "sweets",
    calories: 452,
    carbohydrates: 70.3,
    proteins: 3.7,
    fats: 17.0,
    usageCount: 1
  },
  4: { id: 4, name: "domestos", category: "chemistry", usageCount: 1 },
  5: { id: 5, name: "mydło", category: "chemistry", usageCount: 1 },
  6: { id: 6, name: "folia aluminiowa", category: "chemistry", usageCount: 1 },
  7: {
    id: 7,
    name: "ser żółty",
    category: "dairy",
    calories: 380,
    carbohydrates: 0.1,
    proteins: 28.8,
    fats: 29.7,
    usageCount: 1
  },
  8: {
    id: 8,
    name: "pomidor",
    category: "vegetables",
    calories: 19,
    carbohydrates: 2.9,
    proteins: 0.9,
    fats: 0.2,
    usageCount: 1
  },
  9: {
    id: 9,
    name: "kurczak",
    category: "meat",
    calories: 99,
    carbohydrates: 0,
    proteins: 21.5,
    fats: 1.3,
    usageCount: 1
  },
  10: {
    id: 10,
    name: "mrożone truskawki",
    category: "frozen-food",
    usageCount: 1
  }
};

export default function(state = INITIAL_PORDUCTS, action) {
  switch (action.type) {
    /* mieso, nabial, pieczywo, owoce, warzywa, mrozonki, slodycze, chemia, kuchnia, lazienka, napoje  */
    case ADD_PRODUCT: {
      const index = _.size(state);
      const { product, listID } = action.payload;
      const match = _.find(state, { name: product.name });
      if (match) {
        return {
          ...state,
          [match.id]: {
            ...state[match.id],
            usageCount: state[match.id].usageCount + 1
          }
        };
      } else {
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
