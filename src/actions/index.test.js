import { createNewCart, updateProductCount, addProduct } from "./index.js";
import { UPDATE_CART_PRODUCT_COUNT } from "./types";
import axios from "axios";
import { nutritionixAPI } from "../api/nutritionix";

describe("cart actions", () => {
  describe("updateProductCount", () => {
    it("should return cart action", () => {
      expect(updateProductCount(0, 0, "", "cart")).toEqual({
        type: UPDATE_CART_PRODUCT_COUNT,
        payload: {
          actionType: "",
          listID: 0,
          productID: 0
        }
      });
    });
  });
  describe("API testing", () => {
    it("should fetch from api info about 4 specific product nutrients", async () => {
      const mockedName = "banana";
      expect.assertions(1);
      const data = await nutritionixAPI.get("/search/instant/", {
        params: {
          common_general: true,
          detailed: true,
          claims: true,
          branded: false,
          query: mockedName
        }
      });
      expect(data.data.common[0]).toMatchSnapshot({
        full_nutrients: expect.arrayContaining([
          expect.objectContaining({ attr_id: 203 }),
          expect.objectContaining({ attr_id: 204 }),
          expect.objectContaining({ attr_id: 205 }),
          expect.objectContaining({ attr_id: 208 })
          // TODO: throw error with message when uncomment line below
          // expect.objectContaining({ attr_id: 1208 })
        ])
      });
    });
  });
});

// if axios is mocked with below, nutritionixAPI doesn't work
// jest.mock("axios");
// it("action should receive object", async () => {
//   const product = { name: "banana" };
//   const mockedResponse = { data: product };
//   axios.get.mockResolvedValue(mockedResponse);
//   const response = await axios.get();

//   expect(response.data).toEqual(product);
// });
