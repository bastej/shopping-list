import cartReducer from "../reducer_carts";

import {
  CREATE_NEW_CART,
  UPDATE_CART_PRODUCT_COUNT,
  DELETE_CART_PRODUCT
} from "../../actions/types";

describe("CardReducer", () => {
  it("returns the initial state", () => {
    expect(cartReducer(undefined, {})).toMatchSnapshot();
  });

  it("handles the createNewCart action", () => {
    expect(
      cartReducer({}, { type: CREATE_NEW_CART, payload: {} })
    ).toMatchSnapshot();
  });

  describe("updateProductCount", () => {
    let mockedState;

    beforeEach(() => {
      mockedState = {
        0: {
          id: 0,
          productsList: {
            0: {
              id: 0,
              count: 10
            },
            1: {
              id: 1,
              count: 3
            }
          }
        }
      };
    });

    it("should increment product count + 1", () => {
      const state = cartReducer(mockedState, {
        type: UPDATE_CART_PRODUCT_COUNT,
        payload: {
          actionType: "increment",
          listID: 0,
          productID: 0
        }
      });

      expect(state[0].productsList[0].count).toBe(11);
    });

    it("should decrement product count - 1", () => {
      const state = cartReducer(mockedState, {
        type: UPDATE_CART_PRODUCT_COUNT,
        payload: {
          actionType: "",
          listID: 0,
          productID: 0
        }
      });
      expect(state[0].productsList[0].count).toBe(9);
    });

    it("should delete product", () => {
      const state = cartReducer(mockedState, {
        type: DELETE_CART_PRODUCT,
        payload: {
          listID: 0,
          productID: 1
        }
      });
      expect(state[0].productsList[1]).toBeUndefined();
    });
  });
});
