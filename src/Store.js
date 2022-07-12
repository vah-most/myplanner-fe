/*
 * Created on Wed Jul 06 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./reducers/PreferencesReducer";
import searchReducer from "./reducers/SearchReducer";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    preferences: preferencesReducer,
  },
});
