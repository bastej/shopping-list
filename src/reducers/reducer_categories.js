import { ADD_CATEGORY } from "../actions/types";
import _ from "lodash";
import bread from "../images/bread.png";
import dairy from "../images/dairy.png";
import drinks from "../images/drinks.png";
import fruits from "../images/fruits.png";
import meat from "../images/meat.png";
import sweets from "../images/sweets.png";
import vegetables from "../images/vegetables.png";

const INITIAL_CATEGORIES = {
  0: { id: 0, name: "meat", img: meat },
  1: { id: 1, name: "dairy", img: dairy },
  2: { id: 2, name: "bread", img: bread },
  3: { id: 3, name: "fruits", img: fruits },
  4: { id: 4, name: "vegetables", img: vegetables },
  5: { id: 5, name: "sweets", img: sweets },
  6: { id: 6, name: "drinks", img: drinks }
};

export default function(state = INITIAL_CATEGORIES, action) {
  switch (action.type) {
    case ADD_CATEGORY: {
      const index = _.size(state);
      const category = action.payload;
      // check if category exist
      const match = _.find(state, { name: category });
      if (match) {
        return state;
      } else {
        return {
          ...state,
          [index]: {
            id: index,
            name: category
          }
        };
      }
    }
    default:
      return state;
  }
}
