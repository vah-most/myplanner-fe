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
import syncReducer from "./reducers/SyncReducer";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    search: searchReducer,
    sync: syncReducer,
  },
});
