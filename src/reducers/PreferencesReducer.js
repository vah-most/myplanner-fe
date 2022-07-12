/*
 * Created on Tue Jul 12 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { createSlice } from "@reduxjs/toolkit";
import preferencesService from "services/PreferencesService";

const initialState = {
  value: preferencesService.get(),
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    preferencesChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = preferencesSlice;
export const { preferencesChange } = actions;
export default reducer;
