import axios from "axios";

axios.defaults.baseURL =
  "https://moments-api-shaander-19059c743c88.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
