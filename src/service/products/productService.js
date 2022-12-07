import { mockProductReviews } from "./mockProductReviews";
import { mockProducts } from "./mockProducts";

export const getProductById = (id) => {
  return mockProducts[0];
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/products/" + id,
  //   });
};

export const getAllProducts = () => {
  return mockProducts;
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/products",
  //   });
};

export const getProductReviews = (id) => {
  return mockProductReviews;
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/products/" + id + "/reviews",
  //   });
};
