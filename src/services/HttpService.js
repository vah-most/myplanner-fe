/*
 * Created on Tue Jul 19 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import axios from "axios";

class HttpService {
  get = axios.get;
  put = axios.put;
  post = axios.post;
  delete = axios.delete;

  isOk(result) {
    return result && result.status && result.status === 200;
  }

  getData(result) {
    return result && result.data ? result.data : null;
  }
}

const httpService = new HttpService();
export default httpService;
