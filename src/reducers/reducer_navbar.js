import { SET_NAV_HEADER } from '../actions/types';

export default function(state = '', action) {
    switch(action.type) {
        case SET_NAV_HEADER:
            return action.payload;
        default:
            return state
    }
}