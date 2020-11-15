import React from "react";
import '../Style/homepage.css';
import axios from 'axios'
import Av from './EditProfile/avatar.png';
import { Layout, Menu, Breadcrumb, Avatar, Button } from "antd";
import AddPlay from './Play/AddPlay'
import LogPlay from './Play/ShowPlays'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import { Link, Redirect, Route } from 'react-router-dom';
const user = "";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const proxyurl = "http://localhost:8010/proxy";





class HomePage extends React.Component {
  state = {
    collapsed: false,
    img: '',
    username: localStorage.getItem('user')
  };
  proxyurl = "http://localhost:8010/proxy";

  getInfo = (e) => {

    axios.get(this.proxyurl + '/auth/edit_profile/', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    }
    ).then((res) => {

      localStorage.setItem('avatar', res.data.avatar);


    })
      .catch((error) => {
      }
      )

  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  edit = () => {
    window.location.href = window.location.origin + "/editProfile/:" + localStorage.getItem('id');
  }
  componentDidMount() {
    this.getInfo();
  }

 
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{ background: '#626c74' }}
        >

          <Menu
            className="side-menu"
            theme="light"
            defaultSelectedKeys={["0"]}
            mode="inline"
            style={{ position: "sticky", top: "-20px" }}>
            {localStorage.getItem('avatar') === '' ? <img src={Av}
              style={{ marginLeft: '10%' }} height="50px" /> :
              <img src={localStorage.getItem('avatar')} style={{ marginLeft: '10%' }} height="50px" />}
            {'    ' + this.state.username}
            <Menu.Item className="edit-pro" key="0" onClick={this.edit}
              style={{ height: "55px", marginTop: "10px", marginBottom: "30px" }}>

              tap to edit
            </Menu.Item >
            <Menu.Item className="m-item" key="2" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item className="m-item" key="3" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item className="m-item" key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ background: "#dfe8e8", margin: "0 0" }}
        >

          <Header
            className="site-layout-background"
            style={{ height: "100px", fontSize: "60px" }}
          >
            Gamology
            </Header>

          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 660 }}
            >
              <LogPlay />
            </div>
            
          </Content>
          <Footer className="footer" style={{ textAlign: "center" }}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default HomePage;
