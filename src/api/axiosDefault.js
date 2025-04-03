/// IMPORT ///
import axios from "axios";

/// AXIOS DEFAULTS ///
axios.defaults.baseURL =
  "https://moments-api-shaander-19059c743c88.herokuapp.com";
axios.defaults.withCredentials = true;

/// AXIOS INTERCEPTORS ///

// axiosReq = refreshes user token when action taken
export const axiosReq = axios.create();
// axiosRes = extends user token from 5m to 24hr
export const axiosRes = axios.create();
