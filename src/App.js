/*
 * Created on Tue Jun 21 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { store } from "./Store";
import authService from "services/AuthService";
import LoginPage from "pages/LoginPage";
import Page from "components/Page";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

class App extends React.Component {
  state = { user: null, initialized: false };

  componentDidMount() {
    this.setState({ initialized: true });
    try {
      const user = authService.getCurrentUser();
      this.setState({ user });
    } catch (error) {
      this.setState({ user: null });
    }
  }

  render() {
    const { user, initialized } = this.state;
    if (!initialized) return null;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            {user ? (
              <Routes>
                <Route path="/" index element={<Page user={user} />} />;
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            )}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
