import { mockProductReviews } from "./mockProductReviews";
import { mockProducts } from "./mockProducts";
import API_CONFIG from "../apiConfig.js"
import axios from "axios";

export const getProductById = (id) => {
  return mockProducts[0];
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/products/" + id,
  //   });
};

export const getAllProducts = async () => {
  const allProducts = await axios({
      method: "GET",
      url: API_CONFIG + "/products",
  });
  console.log("allProducts:", allProducts)
  return allProducts.data;
};

export const getProductReviews = (id) => {
  return mockProductReviews;
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/products/" + id + "/reviews",
  //   });
};
