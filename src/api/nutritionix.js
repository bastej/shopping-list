import axios from "axios";

const API_KEY = "66dc95ac590ef97c7de66e82397a3853";
const APP_KEY = "6bbdffac";

export const nutritionixHints = axios.create({
  baseURL: "https://trackapi.nutritionix.com/v2",
  headers: {
    "x-app-id": APP_KEY,
    "x-app-key": API_KEY,
    "x-remote-user-id": 0
  }
});
