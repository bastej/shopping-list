import {
    GET_PRODUCT_HINTS,
    CLEAR_PRODUCT_HINTS
} from "../actions/types";
  
export default function(state = [], action) {
    switch (action.type) {
      case GET_PRODUCT_HINTS: {
        return [...action.payload]
      }
      case CLEAR_PRODUCT_HINTS: {
        return []
      }
      default:
        return state;
    }
}
  