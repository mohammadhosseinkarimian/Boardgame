import React from "react";
import moment from "moment";
import {
  Form,
  Input,
  Tooltip,
  InputNumber,
  AutoComplete,
  Button,
  Select,
  Divider,
  TimePicker,
} from "antd";
import "antd/dist/antd.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
const { RangePicker } = TimePicker;
const { Option } = Select;

let index = 0;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class Cafe extends React.Component {
  state = {
    name: "",
    Description: "",
    List_of_board_games: "",
    items: ["Chess", "tic-tac-toe", "monopoly"],
    Price: 0,
    Open_time: "00:00",
    Close_time: "00:00",
    Telephone: "",
    loggedIn: "",
    msg: "",
  };

  onFinish = (values) => {};
  onChange = (e) => {
    e.persist();
    console.log(this.state);
    this.setState((a) => {
      return {
        [e.target.name]: e.target.value,
      };
    });
  };
  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  descriptionChange = (e) => {
    this.setState({ Description: e.target.value });
  };
  l_o_bgChange = (e) => {
    var dict = { item: e };
    // this.state.List_of_board_games.push(dict);
    this.setState(
      { List_of_board_games: this.state.List_of_board_games + " " + e },
      () => {
        console.log(this.state.List_of_board_games);
      }
    );
  };
  pricechange = (e) => {
    this.setState({ Price: e.target.value });
    //console.log("changed", e);
    // if (e > 0) {
    //   return Promise.resolve();
    // }
    // return Promise.reject("Price must be greater than zero!");
  };
  open_tChange = (e) => {
    if (e !== null) this.setState({ Open_time: e.format("LT") });
  };
  close_tCange = (e) => {
    if (e !== null) this.setState({ Close_time: e.format("LT") });
  };
  telephoneChange = (e) => {
    this.setState({ Telephone: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  render() {
    const { items } = this.state;
    return (
      <div className="Cafe_container">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>{" "}
        <Form
          {...formItemLayout}
          // form={this.form}
          name="register-cafe"
          ref={(el) => (this.myFormRef = el)}
          onFinish={this.onSubmit}
          scrollToFirstError
          onSubmit={this.onSubmit.bind(this)}
        >
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="There was something wrong with the server please try again"?
        "There was something wrong with the server please try again":""}</p> */}
          <Form.Item
            name="name"
            onChange={this.onChange}
            label={<span>Cafe name&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input cafename!",
                whitespace: true,
              },
            ]}
          >
            <Input
              required
              name="name"
              onChange={(this.onChange, this.nameChange)}
            />
          </Form.Item>
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="A cafe with that name already exists."? 
        "A cafe with that name already exists.":""}</p> */}
          <Form.Item
            name="Description"
            label={
              <span>
                Description&nbsp;
                <Tooltip title="Type address and some descriptions about caffe">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please input cafename!",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          >
            <Input.TextArea
              required
              name="Description"
              onChange={(this.onChange, this.descriptionChange)}
            />
          </Form.Item>
          <Form.Item
            label={
              <span>
                Board games&nbsp;
                <Tooltip title="What board games are there in the cafe?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Select Board games of caffe",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          >
            <Select
              required
              mode="multiple"
              title={"Gameboards in cafe:"}
              style={{ width: 240 }}
              placeholder="Gameboards"
              onSelect={(this.onChange, this.l_o_bgChange)}
            >
              {this.state.items.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            label={<span>Open</span>}
            rules={[
              {
                required: true,
                message: "this item is require",
                whitespace: true,
              },
            ]}
          >
            <TimePicker
              style={{ width: 240 }}
              use24Hours
              format={"HH:mm"}
              defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.open_tChange)}
            />
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            label={<span>Close</span>}
            rules={[
              {
                required: true,
                message: "this item is require",
                whitespace: true,
              },
            ]}
          >
            <TimePicker
              style={{ width: 240 }}
              use24Hours
              format={"HH:mm"}
              defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.close_tCange)}
            />
          </Form.Item>
          <Form.Item
            name="Price"
            onChange={this.onChange}
            label={
              <span>
                Price&nbsp;
                <Tooltip title="How much does each hour of playing in the cafe cost?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input
              style={{ width: 240 }}
              name="Price"
              onChange={(this.onChange, this.pricechange)}
            />
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            name="Telephone"
            label={<span>Phone number&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input phone number!",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="Telephone"
              onChange={(this.onChange, this.telephoneChange)}
              style={{ width: 240 }}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={(this.handle, this.onChange)}
              name="submit"
            >
              <span
                class={
                  this.state.loggedIn === "logging in"
                    ? "spinner-border spinner-border-sm"
                    : ""
                }
                role={this.state.loggedIn === "logging in" ? "status" : ""}
                aria-hidden={this.state.loggedIn === "logging in" ? "true" : ""}
              ></span>
              {this.state.loggedIn === "logging in"
                ? "Loading..."
                : "Add Caffe"}
            </button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Cafe;
