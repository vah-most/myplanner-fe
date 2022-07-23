/*
 * Created on Sat Wed 20 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import jwtDecode from "jwt-decode";

import Config from "../Config.json";
import httpService from "./HttpService";
import storageService from "./StorageService";

class AuthService {
  authAPIEndpoint = `${Config.APIAddress}/auth`;
  loginJwtToken = "token";

  constructor() {
    httpService.initAuth(this.logout);
    httpService.setAuthKey(this.getAuthKey());
  }

  getAuthKey() {
    return storageService.getItem(this.loginJwtToken);
  }

  getCurrentUser() {
    const jwt = storageService.getItem(this.loginJwtToken);
    return jwtDecode(jwt);
  }

  async login(username, password) {
    const { data: jwt } = await httpService.post(this.authAPIEndpoint, {
      username: username,
      password: password,
    });

    storageService.setItem(this.loginJwtToken, jwt);
  }
  logout() {
    storageService.removeItem(this.loginJwtToken);
  }
}

const authService = new AuthService();
export default authService;
