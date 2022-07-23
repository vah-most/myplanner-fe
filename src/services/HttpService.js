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

  initAuth(onAuthError) {
    axios.interceptors.response.use(null, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

      if (!expectedError) {
        //TODO: Notify user of Error
      } else if (error.response && error.response.status === 440) {
        onAuthError();
        window.location = "/";
      }

      return Promise.reject(error);
    });
  }

  isOk(result) {
    return result && result.status && result.status === 200;
  }

  getData(result) {
    return result && result.data ? result.data : null;
  }

  setAuthKey(authKey) {
    axios.defaults.headers.common["x-auth-token"] = authKey;
  }
}

const httpService = new HttpService();
export default httpService;
