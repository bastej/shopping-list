import cartReducer from "../reducer_carts";

import {
  CREATE_NEW_CART,
  UPDATE_CART_PRODUCT_COUNT,
  DELETE_CART_PRODUCT
} from "../../actions/types";

describe("CardReducer", () => {
  const initialState = {
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

  it("returns the initial state", () => {
    expect(cartReducer(undefined, {})).toMatchSnapshot();
  });

  it("handles the createNewCart action", () => {
    expect(
      cartReducer({}, { type: CREATE_NEW_CART, payload: {} })
    ).toMatchSnapshot();
  });

  describe("updateProductCount", () => {
    it("should increment product count + 1", () => {
      expect(
        cartReducer(initialState, {
          type: UPDATE_CART_PRODUCT_COUNT,
          payload: {
            actionType: "increment",
            listID: 0,
            productID: 0
          }
        })
      ).toEqual({
        0: {
          id: 0,
          productsList: {
            0: {
              id: 0,
              count: 11
            },
            1: {
              id: 1,
              count: 3
            }
          }
        }
      });
    });

    it("should decrement product count - 1", () => {
      expect(
        cartReducer(initialState, {
          type: UPDATE_CART_PRODUCT_COUNT,
          payload: {
            actionType: "",
            listID: 0,
            productID: 0
          }
        })
      ).toEqual({
        0: {
          id: 0,
          productsList: {
            0: {
              id: 0,
              count: 9
            },
            1: {
              id: 1,
              count: 3
            }
          }
        }
      });
    });

    it("should delete product", () => {
      expect(
        cartReducer(initialState, {
          type: DELETE_CART_PRODUCT,
          payload: {
            listID: 0,
            productID: 0
          }
        })
      ).toEqual({
        0: {
          id: 0,
          productsList: {
            1: {
              id: 1,
              count: 3
            }
          }
        }
      });
    });
  });
});
