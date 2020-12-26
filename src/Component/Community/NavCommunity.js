import React from "react";
import '../../Style/design.scss';
import axios from "axios";
import StarRatings from 'react-star-ratings';
import { GiTwoCoins,GiLevelFourAdvanced,GiLevelThreeAdvanced,GiLevelTwoAdvanced} from "react-icons/gi";
import {  FaMapMarkerAlt,FaClock,FaPenNib,FaPhone,FaQuoteRight,FaEye } from "react-icons/fa";
import {  FiMoreVertical} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
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
 return (      <div 
 style={{marginTop: '9%', fontSize:'20px'}}
dataSource={this.state.ownerList}><h3 style={{marginLeft: '5%'}}>Cafe In Site</h3>

         {     <List
size="large"
itemLayout="horizontal"
dataSource={this.state.ownerList}
renderItem={item => (
  this.state.ownerList.forEach(item => a=(item.image.base64)),
  <List.Item className="cafe_part">
    <List.Item.Meta 
      avatar={<img src={item.image.base64} style={{width: "200px",height: "150px"}} className="cafe_img"/>}
      title={<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke'}} className="cafe_name">{item.name}</p></Link>}
    
    
/>  
  </List.Item>
)}
/> }
</div>
    );
  }
}
export default NavCom;
