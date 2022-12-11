let apiUrl;
const apiUrls = {
  production: "",
  development: "http://localhost:3000" || "https://cs4550-final.herokuapp.com",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
