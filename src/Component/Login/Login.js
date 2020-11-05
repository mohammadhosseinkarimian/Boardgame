import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "axios";
import {Link} from 'react-router-dom'
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
class Login extends React.Component {
  state = {
    password: "",
    username: "",
    loggedIn:"",
    msg:""
  };
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  onChange = (e) => {
    e.persist()
    this.setState(a=>{
      return {
        [e.target.name]:e.target.value
      }
    })
    console.log(this.state)

  };
  proxyurl= "https://cors-anywhere.herokuapp.com/";
  onSubmit=(e)=>{
    const login={
      username:this.state.username,
      password:this.state.password
    }
    if((this.state.username!=="")&&(this.state.password.length>=8)
   )
   {
    this.setState({loggedIn:"logging in"})
    Axios.post(this.proxyurl+'http://gameboard.pythonanywhere.com/auth/login/',JSON.stringify(this.state),
    {
      headers:{'Content-Type':'application/json'}
    }).then((res)=>{
      window.location.href="https://www.google.com/";
      const refreshToken = res.data.refresh;
      const accessToken = res.data.access;
      localStorage.setItem('refresh', refreshToken);
      localStorage.setItem('access', accessToken);
      this.setState({msg:"loged_in"});

    })
    .catch((error)=>{
     if(JSON.stringify(error.response).includes("No active account found with the given credentials"))
     {
      this.setState({loggedIn:""});
       this.setState({msg:"Username or Password is wrong."});
     
     }
    else if(JSON.stringify(error.response).includes("Either the username or entry doesn't exist."))
     {
      this.setState({loggedIn:""});
      this.setState({msg:"Username or Password is wrong."});
    
     }
     
     
     // alert(JSON.stringify(error.response));
    })
    const login_json=JSON.stringify(login)
  }
  };
  render() {
    return (
      <div className="bg" >
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
            <Checkbox >Remember me</Checkbox>
          </Form.Item>
          <p className ="ant-form-item-extra" >
            {this.state.msg==="Username or Password is wrong."?"Username or Password is wrong. try again!":""}</p>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" name="submit" onClick={this.onSubmit}>
            <span
           class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
            role={this.state.loggedIn==="logging in" ?"status":""}
          aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

          </span>
        {this.state.loggedIn==="logging in" ? "Loading...":"Submit" }
      
            </Button>
          </Form.Item>
        </Form>
        <p className ="ant-form-item-change"  >Don’t have an account? <Link to="signup">Sign up</Link></p>
      </div>
      </div>
    );
  }
}
export default Login;
