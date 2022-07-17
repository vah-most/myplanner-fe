/*
 * Created on Tue Jun 21 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { Provider } from "react-redux";

import { store } from "./Store";
import AppMainView from "./components/AppMainView";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppMainView />
      </div>
    </Provider>
  );
}

export default App;
