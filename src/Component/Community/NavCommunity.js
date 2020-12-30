import React from "react";
import '../../Style/design.scss';
import axios from "axios";
import StarRatings from 'react-star-ratings';
import { GiTwoCoins,GiLevelFourAdvanced,GiLevelThreeAdvanced,GiLevelTwoAdvanced} from "react-icons/gi";
import {  FaMapMarkerAlt,FaClock,FaPenNib,FaPhone,FaQuoteRight,FaEye,FaCrown ,FaUserAlt} from "react-icons/fa";
import {  FiMoreVertical} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import noBg from './images.png' ;
import 'antd/dist/antd.css';
import {
    Row, Col ,Avatar, Button,List
} from "antd";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
let a="";

class NavCom extends React.Component {
    state = {
      memberList: [],
    ownerList: [] 
    };
    proxyurl= "http://localhost:8010/proxy";
    componentDidMount(){
        axios.get(this.proxyurl+'/community/owner_communities_list/',{headers:{
            'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
            'Accept' : 'application/json',
            'Authorization' :`Bearer ${localStorage.getItem('access')}`
          }}
        ).then((res)=>{
          //console.log(res.data+"reeee")
          this.setState({ownerList: res.data})
        })
        .catch((error)=>
          {
           // console.log(error.respose+"errrr")
          })


      axios.get(this.proxyurl+'/community/member_communities_list/',{headers:{
        'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
        'Accept' : 'application/json',
        'Authorization' :`Bearer ${localStorage.getItem('access')}`
      }}
    ).then((res)=>{
      //console.log(res.data+"reeee")
      this.setState({memberList: res.data})
    })
    .catch((error)=>
      {
       // console.log(error.respose+"errrr")
      })
    }
    render() {
 return (   <div>  <div 
 style={{marginTop: '1%', fontSize:'20px'}}
dataSource={this.state.ownerList}>

         {     <List
size="large"
itemLayout="horizontal"
dataSource={this.state.ownerList}
renderItem={item => (
  this.state.ownerList.forEach(item => a=(item.image.base64)),
  <List.Item style={{borderColor: 'transparent'}}>
    <List.Item.Meta  style={{borderColor: 'transparent'}}
      avatar={item.image.base64===''?<img src={noBg} style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>:<img src={item.image.base64}style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>}
      description={<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke',fontSize: '16px',marginLeft: '1%',marginTop: '0.5%'}}><FaCrown style={{color: 'gold',marginTop: '-7.5%'}}/> {item.name}</p></Link>}
    
    
/>  
  </List.Item>
)}
/> }
</div>
<div 
 style={{fontSize:'20px'}}
dataSource={this.state.memberList}>

         {     <List
size="large"
itemLayout="horizontal"
dataSource={this.state.memberList}
renderItem={item => (
  this.state.memberList.forEach(item => a=(item.image.base64)),
  <List.Item style={{borderColor: 'transparent'}}>
    <List.Item.Meta  style={{borderColor: 'transparent'}}
      avatar={item.image.base64===''?<img src={noBg} style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>:<img src={item.image.base64}style={{width: "40px",height: "40px",borderRadius: '10px'}} className="cafe_img"/>}
      description={<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke',fontSize: '16px',marginLeft: '1%',marginTop: '0.5%'}}><FaUserAlt style={{fontSize: '14px',color: 'cyan',marginTop: '-7.5%'}}/> {item.name}</p></Link>}
    
    
/>  
  </List.Item>
)}
/> }
</div>
</div >
    );
  }
}
export default NavCom;
