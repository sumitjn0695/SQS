import { createSlice } from "@reduxjs/toolkit";

const planslice = createSlice({
  name: "planslice",
  initialState: {
    selected_category: null,
    selected_plan: null,
    connected: true,
  },
  reducers: {
    setSelectedCategoryState: (state, actions) => {
      state.selected_category = actions.payload;
    },
    setSelectedPlanState: (state, actions) => {
      state.selected_plan = actions.payload;
    },
    setNetworkStatusState: (state, actions) => {
      state.connected = actions.payload;
    },
  },
});

export default planslice.reducer;

export const { setSelectedCategoryState } = planslice.actions;
export const { setSelectedPlanState } = planslice.actions;
export const { setNetworkStatusState } = planslice.actions;

//sets selected category
export const setSelectedCategory = (current) => (dispatch) => {
  //checking for network and setting the status in store if offline
  if (navigator.onLine) dispatch(setSelectedCategoryState(current));
  else dispatch(setNetworkStatusState());
};

//sets selected plan in state
export const setSelectedPlan = (current) => (dispatch) => {
  //checking for network and setting the status in store if offline
  if (navigator.onLine) dispatch(setSelectedPlanState(current));
  else dispatch(setNetworkStatusState());
};

//sets network status in state
export const setNetworkStatus = (value) => (dispatch) => {
  dispatch(setNetworkStatusState(value));
};

export const getSelectedCategory = (state) => state.planslice.selected_category;

//fetches selected plan from store
export const getSelectedPlan = (state) => state.planslice.selected_plan;

//fetches network status from store
export const getNetworkStatus = (state) => state.planslice.connected;
