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
    errors: {},
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

  handleSubmitError = (error) => {
    const { values } = this.state;
    let errors = {};
    const genericError = "Failed to login to server.";
    if (!error || !error.data) {
      errors.username = genericError;
    } else {
      const parts = error.data.split(":");
      if (parts.length === 2 && parts[0] in values) {
        errors[parts[0]] = parts[1];
      } else {
        errors.username = genericError;
      }
    }
    this.setState({ errors });
  };

  handleSubmit = async () => {
    this.setState({ errors: {} });

    const { username, password } = this.state.values;
    try {
      const hiddenPassword = MD5(password).toString();
      await authService.login(username, hiddenPassword);
      window.location = "/";
    } catch (error) {
      this.handleSubmitError(error);
    }
  };

  render() {
    const { errors, values } = this.state;

    return (
      <div className="loginPage">
        <div className="loginContainer">
          <AppForm
            errors={errors}
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
