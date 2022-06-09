import * as axios from "axios";
import config from "./config";

axios.defaults.baseURL = config.REACT_APP_URL_API;