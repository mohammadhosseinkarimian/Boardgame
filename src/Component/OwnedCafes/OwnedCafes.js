import React from "react";
import axios from "axios";
import { Card, } from 'antd';
import { FaCoffee } from "react-icons/fa";
import { AiFillDelete,AiFillClockCircle,AiOutlinePhone } from "react-icons/ai"
import { EditOutlined ,DeleteFilled,EditFilled} from '@ant-design/icons';
import '../../Style/OwnedCafes.css'
import '../../Style/design.scss'
import { GiTwoCoins } from "react-icons/gi";

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
    clickdelete:false
    // id: "02",
    // name: "lamiz",
    // owner: "rajabi",
    // description: "asdfghjkl;oiuytrexcvbnm,;lkjuytredtyuio.,mdedrtuiop;lkjgfdyui",
    // games: ["monopoly", "pantagon", "mench"],
    // images: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
    // price: "12000",
    // latitude: "35.6892",
    // longitude: "51.3890",
    // open_time: "12:00",
    // close_time: "1:00",
    // phone_number: "021-111546",
    // gallery: ""
  }
  onClickDelete = (id) => {
 
    console.log("click")
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
        console.log(data);
        alert("Cafe Deleted")

      })
      .catch((error) => {
        alert("somthing went wrong!")
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
    console.log(res.data)
    this.setState({mycafe:res.data})
  }
  ).catch((error)=>{
    alert('some thing is wrong')
  })};

  componentDidMount() {
    this.getInfo();
};


  render() {
    //alert('an');
    return (
      <div className="mycafe_container">
      { this.state.mycafe.map(item =>(
      this.state.gallery=(item.gallery),
        <Card className="mycafe_card" 
        title={item.name}  
        /*cover={<img src={this.state.gallery[0].base64} style={{width:"98%", marginLeft:'1%'}}/>}*/
        description={item.description}
          actions={[
            <button  style={{backgroundColor:'#333',color:'#fff'}}>
          Edit cafe details<EditFilled className="icon"/> 
            </button>,
            <button  onClick={this.onClickDelete(item.id)}style={{backgroundColor:'#333', color:'#fff'}}>
          Delete cafe<DeleteFilled className="icon"/> 
            </button>
          ]}
        >
       
        </Card> ))}</div>
    ) 
  }
}
export default OwnedCafe;