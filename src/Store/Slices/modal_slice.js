import { createSlice } from "@reduxjs/toolkit";
import { setNetworkStatus } from "./plan_slice";

//slice to store the modal data and visibility state
const modalslice = createSlice({
  name: "modalslice",
  initialState: {
    show_modal: false,
    modal_data: null,
  },
  reducers: {
    setModalVisibleState: (state, actions) => {
      state.show_modal = !state.show_modal;
    },
    setModalDataState: (state, actions) => {
      state.modal_data = actions.payload;
    },
  },
});

export default modalslice.reducer;

export const { setModalVisibleState } = modalslice.actions;
export const { setModalDataState } = modalslice.actions;

//sets modal visible state in store
export const setModalVisible = () => (dispatch) => {
  //checking for network and setting the status in store if offline
  if (navigator.onLine) dispatch(setModalVisibleState());
  else dispatch(setNetworkStatus(false));
};

//sets modal data in store
export const setModalData = (current) => (dispatch) => {
  //checking for network and setting the status in store if offline
  if (navigator.onLine) dispatch(setModalDataState(current));
  else dispatch(setNetworkStatus(false));
};

//fetches modal visible state
export const getModalVisibleState = (state) => state.modalslice.show_modal;
export const getModalData = (state) => state.modalslice.modal_data;
