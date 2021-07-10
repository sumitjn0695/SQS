import { Button, Card } from "antd";
import React from "react";
import "./plancards.css";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { setSelectedPlan } from "../../Store/Slices/plan_slice";
import { setModalVisible } from "../../Store/Slices/modal_slice";
import PropTypes from "prop-types";
import HELPERS from "../../Helpers/helper";

const Plancard = (props) => {
  const dispatch = useDispatch();
  const data = props.data;
  const is_popular = props.index === 1;

  //setting the selected plan on button click to the store
  const onClickPlan = (data) => {
    // checking if the selected plan is a regular plan or enterprise
    if (data) dispatch(setSelectedPlan(data));
    else dispatch(setSelectedPlan({ plan_name: "Enterprise" }));
    dispatch(setModalVisible());
  };

  return (
    <Card.Grid className="grid-style" hoverable={false}>
      {data ? (
        <>
        {/* check for most popular plan in the price range (took 2nd element here) */}
          {is_popular ? (
            <div className="popular-head">Most Popular!</div>
          ) : (
            <div className="card-head">&nbsp;</div>
          )}

          <div className="plan-name">{data["plan_name"]}</div>
          <div className={is_popular ? "mid-content-popular" : "mid-content"}>
            <p className="price-value">{HELPERS.formatToCurrency(data.price_per_live_transfer)}</p>
            <p className="mid-content-text1">Per Qualified Lead</p>
            <hr className="dotted" />
            <p className="mid-content-text">Qualified Leads Per Month</p>
            <p className="data-value">{data.leads_per_month}</p>
            <hr className="dotted" />
            <p className="mid-content-text">Platform Fee Per Month</p>
            <p className="data-value">{HELPERS.formatToCurrency(data.total_platform_price)}</p>
          </div>
          <div className="plan-total">{HELPERS.formatToCurrency(data.final_package_price) + "/mo"}</div>

          <Button
            className={is_popular ? "btn-class-popular" : "btn-class"}
            onClick={() => onClickPlan(data)}
          >
            Start Your Trial
          </Button>
        </>
      ) : (
        <>
          <div className="card-head">&nbsp;</div>
          <div className="plan-name">Enterprise</div>
          <div className="extra-content">
            <span> Want more than 80 qualified leads each month?</span>
          </div>
          <Button className="btn-class" onClick={() => onClickPlan(data)}>
            Get in touch
          </Button>
        </>
      )}
    </Card.Grid>
  );
};

//typechecking for received data from api
Plancard.propTypes = {
  data: PropTypes.shape({
    price_range: PropTypes.string,
    plan_name: PropTypes.string,
    leads_per_month: PropTypes.string,
    price_per_live_transfer: PropTypes.string,
    total_qualified_lead_price: PropTypes.string,
    total_platform_price: PropTypes.string,
    final_package_price: PropTypes.string,
  }),
};

export default Plancard;
