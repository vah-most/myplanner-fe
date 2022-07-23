/*
 * Created on Wed Jul 20 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { Component } from "react";
import MD5 from "crypto-js/md5";

import authService from "../services/AuthService";
import AppForm from "./common/AppForm";

import "./AppLoginPage.scss";

const loginInputs = [
  {
    name: "username",
    title: "Username",
    type: "text",
  },
  {
    name: "password",
    title: "Password",
    type: "password",
  },
];

class AppLogin extends Component {
  state = {
    values: {
      username: "",
      password: "",
    },
  };

  handleChange = (param, value) => {
    let values = { ...this.state.values };
    values[param] = value;

    this.setState({ values });
  };

  handleSubmit = async () => {
    const { username, password } = this.state.values;
    try {
      const hiddenPassword = MD5(password).toString();
      await authService.login(username, hiddenPassword);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.handleSubmitError(ex.response.data);
      }
    }
  };

  render() {
    const { values } = this.state;

    return (
      <div className="loginPage">
        <div className="loginContainer">
          <AppForm
            inputLabelClassName="loginInputLabel"
            inputs={loginInputs}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            values={values}
          />
        </div>
      </div>
    );
  }
}

export default AppLogin;
