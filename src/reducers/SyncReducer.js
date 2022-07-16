/*
 * Created on Wed Jul 13 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const syncSlice = createSlice({
  name: "synced",
  initialState,
  reducers: {
    syncStatusChange: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = syncSlice;
export const { syncStatusChange } = actions;
export default reducer;
