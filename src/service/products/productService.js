import { mockProduct } from "./mockProduct";
import { mockProductReviews } from "./mockProductReviews";

export const getProductById = (id) => {
  return mockProduct;
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/product" + id,
  //   });
};

export const getProductReviews = (id) => {
  return mockProductReviews;
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/product" + id + "/reviews",
  //   });
};
