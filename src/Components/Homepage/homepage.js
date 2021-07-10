import { BackTop } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalVisibleState } from "../../Store/Slices/modal_slice";
import { getPlansData, setPlanData } from "../../Store/Slices/plans_data";
import { getNetworkStatus } from "../../Store/Slices/plan_slice";
import Modalform from "../Modals/modal_form";
import Nointernet from "../Nointernet/no_internet";
import Categorycards from "../Plancards/category_cards_list";
import Tabs from "./../Tabs/tabs";
import "./homepage.css";

const Homepage = (props) => {
  const isOnline = useSelector(getNetworkStatus);
  const visible = useSelector(getModalVisibleState);
  const dispatch = useDispatch();
  const plans = useSelector(getPlansData);

  useEffect(() => {
    //executing api call for fetching plans
    if (!plans) dispatch(setPlanData());
  }, [dispatch, plans]);

  return (
    <>
      <div className="homepage" style={!isOnline ? { display: "none" } : {}}>
        <Tabs />
        {plans ? <Categorycards /> : <p>Loading..</p>}
        {visible && <Modalform />}
        <BackTop></BackTop>
      </div>

      {!isOnline && <Nointernet />}
    </>
  );
};

export default Homepage;
