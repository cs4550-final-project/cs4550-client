import { mockProduct } from "./mockProduct";

export const getProductById = (id) => {
  return mockProduct;
  // return axios({
  //     method: "GET",
  //     url: apiUrl + "/product" + id,
  //   });
};
