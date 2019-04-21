import {
    CALCULATE_NUTRIENTS
  } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case CALCULATE_NUTRIENTS:
            return { ...action.payload }
        default:
            return state;
    }
}