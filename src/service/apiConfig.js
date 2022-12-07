let apiUrl;
const apiUrls = {
  production: "",
  development: "https://cs4550-final.herokuapp.com" || "http://localhost:3000",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
