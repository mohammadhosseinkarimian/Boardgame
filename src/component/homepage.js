import React from "react";
import '../Style/homepage.css';
import { Layout, Menu, Breadcrumb, Avatar,Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  EditTwoTone,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class HomePage extends React.Component {
  state = {
    username:"",
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          style={{background:'#626c74' }}
        >
          
          <Menu
           className="side-menu"
            theme="light"
            defaultSelectedKeys={["0"]}
            mode="inline"
            style={{ position: "sticky", top: "-20px" }}>
            <Menu.Item  className="edit-pro" key="0" icon={<UserOutlined   twoToneColor="black"/>} style={{height:"55px" ,marginTop:"30px", marginBottom:"50px"}}>
             <Avatar icon={<UserOutlined />} style={{margin:"15px"}} />
            state.username()
            </Menu.Item >
            <Menu.Item className="m-item" key="2" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item className="m-item" key="3" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            {/* <SubMenu
              className="m-item"
              key="sub1"
              icon={<UserOutlined />}
              title="User"
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              className="m-item"
              key="sub2"
              icon={<TeamOutlined />}
              title="Team"
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu> */}
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
              style={{height: "100px", fontSize: "60px" }}
            >
              Gamology
            </Header>
      
          <Content style={{ margin: "0 16px" }}>
           <Breadcrumb style={{ margin: "16px 0" }}>
             {/*   <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            </Breadcrumb> 
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 660 }}
            >
              
            </div>
          </Content>
          <Footer className="footer" style={{  textAlign: "center" }}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default HomePage;
