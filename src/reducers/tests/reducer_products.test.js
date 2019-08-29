import { INITIAL_PRODUCTS } from "../reducer_products";
import productReducer from "../reducer_products";

import { ADD_CART_PRODUCT } from "../../actions/types";

describe("Product reducer", () => {
  it("should increment +1 product 'usageCount'", () => {
    const existingProduct = {
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
    };
    expect(
      productReducer(INITIAL_PRODUCTS, {
        type: ADD_CART_PRODUCT,
        payload: {
          product: existingProduct
        }
      })
    ).toEqual({
      ...INITIAL_PRODUCTS,
      0: {
        ...existingProduct,
        usageCount: 2
      }
    });
  });

  it("should add new product", () => {
    const newProduct = {
      id: 12,
      name: "bigmac",
      usageCount: 1
    };
    expect(
      productReducer(INITIAL_PRODUCTS, {
        type: ADD_CART_PRODUCT,
        payload: {
          product: newProduct
        }
      })
    ).toEqual({
      ...INITIAL_PRODUCTS,
      12: {
        id: 12,
        name: "bigmac",
        usageCount: 1
      }
    });
  });
});
