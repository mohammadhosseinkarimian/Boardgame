import React from "react";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
//import 'font-awesome/css/font-awesome.min.css';
import '../../Style/design.scss'
import {TeamOutlined,LockFilled} from "@ant-design/icons";
import 'antd/dist/antd.css';
import {
  List,
  Divider
} from "antd";
import { Button, Thumbnail } from "react-bootstrap";
import AV from './images.png'
const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize:10,
  
};

let a="";
class AllCommunity extends React.Component {
  state={
      id:"",
      name:"",
      owner:"",
      description:"",
      members: [],
      gallery:"",
      lock:"", 
      community:[],
      proxyurl : "http://localhost:8010/proxy/community/communities_list/"
  };
      
  componentDidMount() {
    Axios.get("http://localhost:8010/proxy/community/communities_list/")
       .then(res=>{
        //alert("reeeee")
        const cafe_list=res.data;
         this.setState(prevState => {
          console.log(cafe_list)
           return {community: cafe_list}
         })
       })
       .catch(error=>{
         //alert("qqqqq")
         console.log(error.response)
       })
  }
  

  allCafe(){
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>

    return(

      <div className="cafelist_container"
       style={{marginTop: '5%', fontSize:'20px'}}
      dataSource={this.state.community}
        Pagination={paginationProps}><h3 style={{marginLeft: '5%'}}>Communities<TeamOutlined  style={{position:'relative' , top:'-0.25em', marginLeft: '0.5%', fontSize:'27px'}}/></h3>
 
               {     <List
      size="large"
      itemLayout="horizontal"
      pagination={paginationProps}
      dataSource={this.state.community}
      renderItem={item => (
        //this.state.gallery=(item.gallery),
        //this.state.gallery.forEach(item => a=(item.base64)),
        <List.Item className="cafe_part">
          <List.Item.Meta 
            avatar={<img src={item.image.base64===""?AV:item.image.base64} style={{width: "200px",height: "150px"}} className="cafe_img"/>}
          //  title={/*<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke'}} className="cafe_name">{item.name}</p></Link>*/}
           title={<p><span style={{color: 'whitesmoke'}} className="cafe_name">{item.name}</span><span hidden={!item.lock}><LockFilled style={{position:'relative' , top:'-0.25em', marginLeft: '0.5%', fontSize:'27px'}}/></span></p>}
           description={<p style={{marginLeft:'10%'}} ><p>{item.description}
           <p style={{maxwidth:'2%'}}>{item.members.map(element => (
            <span style={{maxwidth:'2%' ,background:'#414141',marginRight:'5%'}}> {element.email}</span>
             ))}</p></p>
             <p >This community already has {item.members.length} members</p></p>}

     
/>
<Button type='link' style={{marginLeft:'-20em'}} className="btn btn-primary" disabled={item.lock}>join</Button>
        </List.Item>
        )}
    /> }
 </div>
    );
  }
  render(){
     return this.allCafe();
         
    }
  }
  export default AllCommunity;

