import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Select,
  AutoComplete,
  Button
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
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

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  // [this.form] = Form.useForm();

  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  onChange = (e) => {
    e.persist();
    console.log(e.target.value);
    console.log(e.target.name);

    this.setState((a) => {
      return {
        [e.target.name]: e.target.value,
      };
    });
    console.log(this.state);
  };
  onSubmit = (e) => {
    const login = {
      username: this.state.username,
      password: this.state.password,
      email:this.state.email
    };
    const login_json = JSON.stringify(login);
    console.log(login_json);
  };

  render() {
    return (
      <div className="Signup_container">
        {" "}
        <Form
          {...formItemLayout}
          // form={this.form}
          name="register"
          onFinish={this.onSubmit}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label={
              <span>
                Username&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input name="username" onChange={this.onChange} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input name="email" onChange={this.onChange} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password name="password" onChange={this.onChange} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Signup;
