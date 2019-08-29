import { add } from "./Calendar";
import axios from "axios";

// class Users {
//   static all() {
//     return axios.get("/users.json").then(resp => resp.data);
//   }
// }

it("should add two number", () => {
  // expect.assertions(2);
  expect(add(2, 3)).toEqual(5);
});

it("shouldn't add third number", () => {
  expect(add(2, 3, 5)).toEqual(add(2, 3));
});

// jest.mock("axios");

// it("should fetch users", () => {
//   const users = [{ name: "Bob" }];
//   const resp = { data: users };
//   axios.get.mockResolvedValue(resp);

//   // or you could use the following depending on your use case:
//   // axios.get.mockImplementation(() => Promise.resolve(resp))

//   return Users.all().then(data => expect(data).toEqual(users));
// });
