import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getModalVisibleState,
  setModalVisible
} from "../../Store/Slices/modal_slice";
import { getSelectedPlan } from "../../Store/Slices/plan_slice";
import "./modal_form.css";

const Modalwrapper = (props) => {
  const dispatch = useDispatch();
  const visible = useSelector(getModalVisibleState);
  const selected_plan = useSelector(getSelectedPlan);
  const onCancel = () => {
    dispatch(setModalVisible());
  };

  return (
    <>
      {selected_plan && (
        <Modal
          title={<div className="modal-title">Get started with SquadVoice</div>}
          centered
          visible={visible}
          onCancel={onCancel}
          width={"80vh"}
          footer={null}
          className="modal-class"
        >
          {props.children}
        </Modal>
      )}
    </>
  );
};

export default Modalwrapper;
