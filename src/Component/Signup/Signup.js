/* import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Signup.css";
import {DataPicker} from 'antd'



export default function Signup() {
  const [username, setUname] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  function validateForm() {
    return email.length > 0 &&
     password.length >= 8 && 
     c_password === password;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setUname("test");

  }
  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <div className="uname">
          <FormGroup controlId="username" bsSize="large">
            <div><ControlLabel>UserName </ControlLabel></div>
            <FormControl
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUname(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="email">
          <FormGroup controlId="email" bsSize="large">
            <div><ControlLabel>Email </ControlLabel></div>
            <FormControl
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="password">
        <FormGroup controlId="password" bsSize="large">
          <div><ControlLabel>Password <h6 style={{display:"inline",color:"red"}}>(َat last 8 character)</h6>
          </ControlLabel></div>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup></div>
        
        <div className="c_password"><FormGroup controlId="c_password" bsSize="large">
         <div> <ControlLabel>Confirm</ControlLabel></div>
          <FormControl
            value={c_password}
            onChange={(e) => setC_Password(e.target.value)}
            type="password"
          />
        </FormGroup></div>
      <div className="botton">
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          SignUp
        </Button></div>
      </form>
    </div>
  );
}

 */
import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class Signup extends React.Component {
  state = {
    password: "",
    username: "",
  };
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  onChange = (e) => {
    e.persist()
    console.log(e.target.value)
    console.log(e.target.name)

    this.setState(a=>{
      return {
        [e.target.name]:e.target.value
      }
    })
    console.log(this.state)

  };
  onSubmit=(e)=>{
    const login={
      username:this.state.username,
      password:this.state.password
    }
    const login_json=JSON.stringify(login)
    console.log(login_json)
  };
  render() {
    return (
      <div className="Login_container">
        {" "}
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSubmit}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
            name="username"
            onChange={this.onChange}

            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password 
            name="password"
            onChange={this.onChange}
            />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Signup;
