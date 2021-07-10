import { configureStore } from "@reduxjs/toolkit";
import planslice from "./Slices/plan_slice";
import modalslice from "./Slices/modal_slice";
import plandataslice from "./Slices/plans_data"

const store = configureStore({
  reducer: {
      planslice,
      modalslice,
      plandataslice
  },
});
export default store;
