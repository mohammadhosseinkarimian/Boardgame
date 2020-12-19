import React from "react";
import axios from "axios";
import { Card, } from 'antd';
import { FaCoffee } from "react-icons/fa";
import { AiFillDelete,AiFillClockCircle,AiOutlinePhone } from "react-icons/ai"
import { EditOutlined ,DeleteFilled,EditFilled} from '@ant-design/icons';
import '../../Style/OwnedCafes.css'
import '../../Style/design.scss'
import Av from './default_picture.png';
import { GiTwoCoins } from "react-icons/gi";
let a="";
const { Meta } = Card;
class OwnedCafe extends React.Component {
  state = {
    mycafe:[],
    id: "",
    name: "",
    owner: "",
    description: "",
    games: [],
    price: "",
    open_time: "",
    close_time: "",
    phone_number: "",
    gallery: [],
    latitude: "",
    longitude: "",
    proxyurl:'http://localhost:8010/proxy',
  }
  onClickDelete = (id) => {
 
    //console.log("click")
    axios.delete('http://localhost:8010/proxy/cafe/edit_cafe/'+id+'/', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    }
    )
      .then(res => {
        const data = res.data;
       // console.log(data);
       // alert("Cafe Deleted")
        this.getInfo();
      })
      .catch((error) => {
      //  alert("somthing went wrong!")
      }
      )
    
  };
  getInfo=(e)=>
  { 
      axios.get(this.state.proxyurl+"/cafe/owner_cafes_list/",{headers:{
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
      }}
  ).then((res)=>{ 
   // console.log(res.data)
    this.setState({mycafe:res.data})
  }
  ).catch((error)=>{
   // alert('some thing is wrong')
  })};

  componentDidMount() {
    this.getInfo();
};

onClickedit = (id) => {
  window.location.href = "/editcafe/:" + id;
};
  render() {
    //alert('an');
    return (
      <div className="mycafe_container">
      { this.state.mycafe.map(item =>(
        localStorage.setItem("cafeid",item.id),
       // console.log(localStorage.getItem('cafeid')),
      this.state.gallery=(item.gallery),
      this.state.gallery.forEach(item => a=(item.base64)),
        <Card className="mycafe_card"
        style={{width:'25%'}} 
        title={item.name}  
       cover={<img  className="photocafe" src={a===''?Av:a} style={{width:"98%", marginLeft:'1%'}}/>}
        description={item.description}
          actions={[
            <button className="button"  onClick ={() => this.onClickedit(item.id)}style={{backgroundColor:'#333',color:'#fff',width:'80%'}}>
          <EditFilled className="icon"/> 
          <p className="text_button">Edit</p>
            </button>,
            <button  className="button" onClick ={() => this.onClickDelete(item.id)}style={{backgroundColor:'#333', color:'#fff',width:'80%'}}>
          <DeleteFilled className="icon"/> 
          <p className="text_button" >Delete</p>
            </button>
          ]}
        >
       
        </Card> ))}</div>
    ) 
  }
}
export default OwnedCafe;