import { Button, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setModalData,
    setModalVisible
} from "../../Store/Slices/modal_slice";
import { getSelectedPlan } from "../../Store/Slices/plan_slice";
import "./modal_form.css";

const Modalform = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const selected_plan = useSelector(getSelectedPlan);
  const LEADS = ["Zillow", "Realtor", "Ylopo", "Others"];
  const LINKS = ["Google", "Facebook", "Email", "Friends", "Real Closers"];

  const onCancel = () => {
    dispatch(setModalVisible());
  };

  const onFinish = (values) => {
    dispatch(setModalData(values));

    //converts data from form to display in alert
    let result = {
      Name: "name",
      Email: "email_address",
      "Phone No.": "phone_no",
      "Number of leads in a month": "no_of_leads",
      "Total leads in CRM": "leads_in_crm",
      "CRM in use": "crm",
      "Number of agents": "no_of_agents",
      "Biggest leads": "biggest_leads",
      "Heard from": "heard_from",
    };

    let display = "Plan: " + selected_plan.plan_name + "\n";

    Object.keys(result).forEach((item) => {
      const temp = values[result[item]];
      if (Array.isArray(temp)) display += item + ": " + temp.join(", ") + " \n";
      else if (temp) display += item + ": " + temp + "\n";
    });
    if (navigator.onLine) {
      alert(display);
      onCancel();
    }
  };

  return (
    <>
      <p className="selected-plan">
        <span className="plan-bold">Plan Selected:</span>{" "}
        {selected_plan.plan_name}
      </p>
      <Form form={form} name="plan_form" onFinish={onFinish}>
        <p className="item-label">Name</p>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input size={"large"} />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
            <p className="item-label">E-mail Address</p>
            <Form.Item
              name="email_address"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter a valid email address",
                },
              ]}
            >
              <Input size={"large"} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
            <p className="item-label">Phone No.</p>
            <Form.Item
              name="phone_no"
              rules={[
                {
                  required: true,
                  pattern: /^\d+$/,
                  message: "Enter a valid phone no.",
                  types: {
                    number: "Input only numbers",
                  },
                },
              ]}
            >
              <Input size={"large"} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
            <p className="item-label">No. of leads you generate in a month</p>
            <Form.Item
              name="no_of_leads"
              rules={[
                {
                  required: false,
                  pattern: /^\d+$/,
                  message: "Input only numbers",
                },
              ]}
            >
              <Input size={"large"} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
            <p className="item-label">Total leads in your CRM</p>
            <Form.Item
              name="leads_in_crm"
              rules={[
                {
                  required: false,
                  pattern: /^\d+$/,
                  message: "Input only numbers",
                },
              ]}
            >
              <Input size={"large"} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
            <p className="item-label">Which CRM do you use?</p>

            <Form.Item name="crm">
              <Input size={"large"} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
            <p className="item-label">No. of agents</p>
            <Form.Item
              name="no_of_agents"
              rules={[
                {
                  required: false,
                  pattern: /^\d+$/,
                  message: "Input only numbers",
                },
              ]}
            >
              <Input size={"large"} />
            </Form.Item>
          </Col>
        </Row>

        <p className="item-label">What are your biggest lead sources?</p>

        <Form.Item name="biggest_leads">
          <Checkbox.Group>
            {LEADS.map((item, index) => (
              <Checkbox key={`${index}_*${new Date().getTime()}`} value={item}>
                {item}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <p className="item-label">How did you heared about us?</p>
        <Form.Item name="heard_from">
          <Radio.Group>
            {LINKS.map((item, index) => (
              <Radio key={`${index}_$$${new Date().getTime()}`} value={item}>
                {item}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="submit-btn" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Modalform;
