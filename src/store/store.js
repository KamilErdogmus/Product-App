import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlices.js";
import modalReducer from "./slices/modalSlice.js";

export const store = configureStore({
  reducer: { data: dataReducer, modal: modalReducer },
});
