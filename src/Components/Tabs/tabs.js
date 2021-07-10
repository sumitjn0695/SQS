import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PRICERANGES } from "../../Constants/price_ranges";
import HELPERS from "../../Helpers/helper";
import { setSelectedCategory } from "../../Store/Slices/plan_slice";
import "./tabs.css";

//to apply conditional styles to leftmost and rightmost tabs
const tabStyle = (length, index) => {
  return {
    width: `calc(100%/${length})`,
    borderRight: index !== length - 1 ? "2px solid #e4e4e4" : "none",
    borderRadius:
      index === 0
        ? "10px 0px 0px 10px"
        : index === length - 1
        ? "0px 10px 10px 0px"
        : "0",
  };
};

const Tabs = React.memo((props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //for setting 3rd price range as default
    let ind = 2;

    if (HELPERS.fetchCategory()) {
      //fetching the last visited price range using localstorage
      ind = parseInt(HELPERS.fetchCategory());
    }
    //setting the corresponding tab to selected and storing its plans list to the store
    document.getElementById("radio" + ind).checked = true;
    dispatch(setSelectedCategory("category_" + (ind + 1).toString()));
  }, [dispatch]);

  //saves selected price range index in localstorage and saves the selected price range category to store
  const setCategory = (index) => {
    let ind = index + 1;
    dispatch(setSelectedCategory("category_" + ind));
    HELPERS.saveCategory(index);
  };

  return (
    <div className="radio-toolbar">
      {PRICERANGES.map((value, index) => (
        <React.Fragment key={`${index}_((${new Date().getTime()}`}>
          <input
            type="radio"
            id={"radio" + index}
            name="radios"
            value={value}
            onClick={() => setCategory(index)}
          />
          <label
            htmlFor={"radio" + index}
            style={tabStyle(PRICERANGES.length, index)}
          >
            {value}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
});

export default Tabs;
