import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import lodash from "lodash";
import { setNetworkStatus } from "./plan_slice";
const plandataslice = createSlice({
  name: "plandataslice",
  initialState: {
    plans: null,
  },
  reducers: {
    setPlanDataState: (state, actions) => {
      state.plans = actions.payload;
    },
  },
});

export default plandataslice.reducer;

export const { setPlanDataState } = plandataslice.actions;

//fetches plans data from api and stores it in plans state
export const setPlanData = () => (dispatch) => {
  axios
    .get("https://run.mocky.io/v3/179f2376-75b5-4a3e-b9d6-3d5ac08db2ba")
    .then((res) => {
      const data = lodash.cloneDeep(res.data);
      if (navigator.onLine) dispatch(setPlanDataState(data));
      else dispatch(setNetworkStatus(false));
    });
};

//fetches plans data from state
export const getPlansData = (state) => state.plandataslice.plans;
