import React from 'react';
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import './Style/homepage.css';
import { BrowserRouter as Router, Redirect, Route,Link, useParams } from 'react-router-dom';
import Av from './Component/EditProfile/avatar.png';
import AllBoardGames from './Component/BoardGame/AllBoardGames'
import SingleGame from './Component/BoardGame/SingleGame'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  EditOutlined
} from "@ant-design/icons";
import HomeGames from './Component/BoardGame/HomeGames';
import EditProfile from './Component/EditProfile/EditProfile';
import { Layout, Menu, Breadcrumb, Avatar,Button } from "antd";
import './Component/BoardGame/allStyle.css';
import Axios from 'axios';
const { Header, Content, Footer, Sider } = Layout;
class Routes extends React.Component {
    state = {
        accessed:false,
        collapsed: false,
        img:'',
        username:localStorage.getItem('user')
      };
     
    data={
      refresh:localStorage.getItem('refresh')
    }
    edit=()=>{
      <Link to={"/editProfile/:"+localStorage.getItem('id')}/>
    }
    proxyurl= "http://localhost:8010/proxy";

  getInfo=(e)=>
  {
      
 
      
      Axios.get(this.proxyurl+'/auth/edit_profile/',{headers:{
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
      }}
  ).then((res)=>{  
      
      localStorage.setItem('avatar',res.data.avatar);
 
  
  } )
  .catch((error)=>
  {
  

          } 
          )
      
     
  
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
   componentDidMount(){
      
     Axios.post('http://localhost:8010/proxy/auth/token/refresh/',JSON.stringify(this.data),
    {
      headers:{'Content-Type':'application/json'}
    }).then((res)=>{
      localStorage.setItem('access',res.data.access);
      this.setState({accessed:true});
      this.getInfo();

    }).catch()
    
   }

    cntrl=()=>{
      const { collapsed } = this.state;
      return (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            
            <Menu
             className="side-menu"
              theme="dark"
              defaultSelectedKeys={["0"]}
              mode="inline"
              style={{ position: "sticky" }}>
                 {localStorage.getItem('avatar')===''?<img src={Av} 
              style={{marginLeft: '1%',marginTop: '5%',width: '75px'}}height="44px" />:
                 <img src = {localStorage.getItem('avatar')} style={{marginLeft: '2%',marginTop: '5%',marginBottom: "2%",width: '75px'}}height="44px"/>}
                
              <Menu.Item  className="m-item" key="0"    icon={<EditOutlined />}
              style={{height: "6%" ,marginTop: "4%", marginBottom: "5%"}}>
      
      <Link to={"/editProfile/:"+localStorage.getItem('id')}> {' '+this.state.username+'(tap to edit)'}</Link>
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
          style={{ background: "white", margin: "0 0" }}
        >
         
            <Header
              className="site-layout-background"
              style={{ fontSize: "24px" }}
            >
              GoardBame
            </Header>
      
          <Content style={{ margin: "0 0",background: "#1F2833" }}>
           <Breadcrumb style={{ margin: "0px 0" }}>
             {/*   <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            </Breadcrumb> 
            <div
              className="site-layout-background"
              style={{marginTop: "4%", minHeight: "100vh", }}
            >
      <switch>
       <Route exact path="/homePage/:id"   component={HomeGames}/>
       <Route exact path="/editProfile/:id" component={EditProfile} />
       <Route exact path="/allgames" component={AllBoardGames} />
       <Route exact path="/allgames/:id" component={SingleGame} />


       <Route exact path='/'>
         <Redirect to ="/homePage/:id" />
         </Route>
         <Route exact path='/signup'>
         <Redirect to ="/homePage/:id" />
         </Route>
     
       </switch>
   
    </div>
  </Content>
  
  </Layout>
</Layout>);
  
}
    render() {
     if(!this.state.accessed)
     {
       return(
        <Router>
        <switch>
        <Route exact path='/'>
          <Login/>
        </Route>
        <Route exact path='/signup'>
          <Signup/>
        </Route>
        </switch>
        </Router>
       )
      }
      else{

      }
      return(
     
      <Router>
          <switch>
          <Route component={this.cntrl}/>
          

          </switch>
       
    
    </Router>
          
      );

      }
       
               
            
        
    }



export default Routes;