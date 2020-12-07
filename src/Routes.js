import React from 'react';
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import './Style/design.scss';
import { BrowserRouter as Router, Redirect, Route,Link, useParams, NavLink } from 'react-router-dom';
import { GiPerspectiveDiceSixFacesSix } from "react-icons/gi";
import Av from './Component/EditProfile/avatar.png';
import AllBoardGames from './Component/BoardGame/AllBoardGames'
import SingleGame from './Component/BoardGame/SingleGame';
import AddPlay from './Component/Play/AddPlay';
import LogPlay from './Component/Play/ShowPlays'
import{
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  EditOutlined, 
  MenuOutlined ,
  PlayCircleOutlined
} from "@ant-design/icons";
import HomeGames from './Component/BoardGame/HomeGames';
import EditProfile from './Component/EditProfile/EditProfile';
import AllCafe from './Component/Listofallcafe/all-cafe-list';
import SingleCafeShow from './Component/SingleCafeShow/SingleCafeShow';
import Cafe from './Component/Cafe-form/cafe-form';
import OwnedCafe from './Component/OwnedCafes/OwnedCafes'
import CafeSearchShow from './Component/SearchCafe/SearchCafe'
import { Layout, Menu, Breadcrumb, Avatar,Button } from "antd";
import './Component/BoardGame/allStyle.css';
import Axios from 'axios';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Routes extends React.Component {
    state = {
        accessed:false,
        collapsed: false,
        img:'',
        disp:'none',
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
   exit=()=>{
     this.setState({accessed:false})
     localStorage.clear();
    
   }

    cntrl=()=>{
      const { collapsed } = this.state;
      var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("head").style.top = "0";
  } else {
    document.getElementById("head").style.top = "-67px";
  }
  prevScrollpos = currentScrollPos;
}
      return (
        <Layout style={{ minHeight: "100vh" ,backgroundColor: "#282828"}}>
           <Header
              id="head"
              className="ant-layout-header"
              style={{ fontSize: "24px", height: "67px", paddingLeft: "2%" }}
            >
             <span style={{float: 'left',marginTop: 'auto'}}>
             <MenuOutlined className='bar' style={{verticalAlign: 'middle'}} onClick={()=>this.state.disp==='none'?this.setState({disp: 'inline'}):this.setState({disp: 'none'})} />
             </span>
              <h2 style={{margin: "auto",display: 'inline'}}> GoardBame</h2>
              
             
            </Header>
         
        <Layout
          className="site-layout"
          style={{ margin: "0 0" }}
        >
          <Sider
            collapsible
            
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            style={{backgroundColor: "#282828" ,display: this.state.disp}}

          >
            <Menu
             className="side-menu"
              theme="dark"
              mode="inline"
              style={{ position: "sticky" ,marginTop: '67px'}}>

             
            <Menu.Item key="3"  icon={<DesktopOutlined  style={{verticalAlign: 'middle',marginTop: '-4px'}}/>}>
            <NavLink to="/homePage/:id"> Home</NavLink> 

            </Menu.Item>
            <Menu.Item  className="m-item"  key="0"    icon={<EditOutlined style={{verticalAlign: 'middle',marginTop: '-4px'}}/>}
              style={{height: "6%" ,marginTop: "4%", marginBottom: "5%"}}>
      
      <NavLink to={"/editProfile/:"+localStorage.getItem('id')}> {' '+this.state.username+'(tap to edit)'}</NavLink>
            </Menu.Item >
            <Menu.Item className="m-item" key="12" >
           <NavLink to='/allcafes/'>Cafes</NavLink>   
            </Menu.Item>


          <SubMenu key="sub1" icon={<GiPerspectiveDiceSixFacesSix />} title=" Play">
            <Menu.Item className="m-item" key="2" icon={<PieChartOutlined  style={{verticalAlign: 'middle',marginTop: '-5px'}}/>}>
            <NavLink to='/addplay/'>Create play</NavLink>   
            </Menu.Item>
            <Menu.Item className="m-item" key="1" icon={<PlayCircleOutlined   style={{verticalAlign: 'middle',marginTop: '-5px'}}/>}>
            <NavLink to='/showplay/'>Show play</NavLink>   
            </Menu.Item>
          </SubMenu>
          
            
            <Menu.Item className="m-item" key="9" onClick={this.exit} icon={<FileOutlined  style={{verticalAlign: 'middle',marginTop: '-5px'}}/>}>
              <NavLink to ='/'>Exit</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
           
      
          <Content className="ant-layout-content" style={{ margin: "0 0" }}>
           <Breadcrumb style={{ margin: "0px 0" }}>
             {/*   <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
            </Breadcrumb> 
            <div
              className="site-layout-background"
              style={{marginTop: "4%", minHeight: "100vh" ,overflow: 'hidden',height: 'max-content'}}
            >
      <switch>
       <Route exact path="/homePage/:id"   component={HomeGames}/>
       <Route exact path="/editProfile/:id" component={EditProfile} />
       <Route exact path="/allgames" component={AllBoardGames} />
       <Route exact path="/allgames/:id" component={SingleGame} />
       <Route exact path="/allcafes" component={AllCafe} />
       <Route exact path="/allcafes/:id" component={SingleCafeShow} />
       <Route exact path="/cafeform" component={Cafe} />
       <Route exact path="/ownedcafe" component={OwnedCafe} />

       <Route exact path="/addplay/" component={AddPlay} />
       <Route exact path="/showplay/" component={LogPlay} />

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
        <Route exact path="/homePage/:id">
         <Redirect to = '/' />
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