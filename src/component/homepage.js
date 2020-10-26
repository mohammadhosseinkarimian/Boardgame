import React from "react";
import "../style/homepage.css";
import { Layout, Menu, Breadcrumb, Button } from "antd";
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
          style={{backgroundImage:'linear-gradient(black,#626c74,black)' }}
        >
          <Button className="edit-pro" type="dashed" icon={<EditTwoTone />}>
            Edit
          </Button>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{ position: "sticky", top: "0" }}
          >
            <Menu.Item className="m-item" key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item className="m-item" key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu
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
            </SubMenu>
            <Menu.Item className="m-item" key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ background: "#eceaea", margin: "10px 0" }}
        >
          <div className="header">
            <Header
              className="site-layout-background"
              style={{ padding: 0, height: "200px" }}
            >
              Header
            </Header>
          </div>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 660 }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer className="footer" style={{  textAlign: "center" }}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default HomePage;
