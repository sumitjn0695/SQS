import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNetworkStatus } from "../../Store/Slices/plan_slice";
import "./no_internet.css";

const Nointernet = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //adding event listener to track if user is back online
    window.addEventListener("online", () => {
      dispatch(setNetworkStatus(true));
    });
  }, [dispatch]);

  useEffect(() => {
    //removing event listener
    return () =>
      window.removeEventListener("online", () => {
        dispatch(setNetworkStatus(true));
      });
  });

  return (
    <div className="no-internet">
      <span className="middle-text">You are not connected to internet</span>
    </div>
  );
};

export default Nointernet;
