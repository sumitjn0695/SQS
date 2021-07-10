import { Card } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { getPlansData } from "../../Store/Slices/plans_data";
import { getSelectedCategory } from "../../Store/Slices/plan_slice";
import "./plancards.css";
import Plancard from "./plan_card";

//wrapper component for all plans cards of a single price range
const Categorycards = React.memo((props) => {
  const selected_category = useSelector(getSelectedCategory);
  const PLANS = useSelector(getPlansData);
  return (
    <>
      {selected_category && PLANS && (
        <Card className="card-wrapper" bordered={false}>
          {selected_category &&
            PLANS[selected_category].map((item, index) => (
              <React.Fragment key={`${index}_${new Date().getTime()}`}>
                <Plancard data={item} index={index} />
                <hr className="line-break" />
              </React.Fragment>
            ))}
          <Plancard key={`$999_${new Date().getTime()}`} />
        </Card>
      )}
    </>
  );
});

export default Categorycards;
