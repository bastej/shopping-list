import {
  INIT_CALENDAR,
  SET_NEXT_MONTH,
  SET_PREV_MONTH
} from "../actions/types";

const INITIAL_STATE = {
  baseDateObject: null,
  year: null,
  month: null,
  day: null,
  today: {
    year: null,
    month: null,
    day: null
  },
  daysNames: [],
  daysToShow: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INIT_CALENDAR:
      return {
        ...state,
        ...action.payload
      };
    case SET_NEXT_MONTH:
      const baseDateObject = state.baseDateObject.add(1, "month");
      return {
        ...state,
        baseDateObject
      };
    case SET_PREV_MONTH:

    default:
      return state;
  }
}
