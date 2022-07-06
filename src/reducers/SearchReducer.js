/*
 * Created on Wed Jul 06 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "searchText",
  initialState,
  reducers: {
    searchTextChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = searchSlice;
export const { searchTextChange } = actions;
export default reducer;
