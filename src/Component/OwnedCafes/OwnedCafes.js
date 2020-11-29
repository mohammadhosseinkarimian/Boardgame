import React from "react";
import Axios from "axios";
import { Card, } from 'antd';
import { FaCoffee } from "react-icons/fa";
import { AiFillDelete,AiFillClockCircle,AiOutlinePhone } from "react-icons/ai"
import { EditOutlined } from '@ant-design/icons';
import '../../Style/OwnedCafes.css'
import { GiTwoCoins } from "react-icons/gi";

const { Meta } = Card;
class OwnedCafe extends React.Component {
  state = {
    id: "1",
    name: "",
    owner: "",
    description: "",
    games: [],
    price: "",
    open_time: "",
    close_time: "",
    phone_number: "",
    gallery: "",
    latitude: "",
    longitude: ""

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
  onClickDelete = () => {
    Axios.delete('http://localhost:8010/proxy/cafe/edit_cafe/' + this.state.id, {
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
        alert("Deleted cafe" + this.state.name)

      })
      .catch((error) => {
        alert("somthing went wrong!")
      }
      )



  }


  render() {
    return (
      <div>
        <Card title={this.state.name} extra={<a onClick={this.onClickDelete} href="#"><AiFillDelete /></a>} style={{ width: 300 }}>
          <p><AiOutlinePhone />  {this.state.phone_number}</p>
          <p><GiTwoCoins />  {this.state.price}</p>
          <p><AiFillClockCircle />  {this.state.open_time} to {this.state.close_time}</p>
        </Card>
      </div>
    )
  }
}
export default OwnedCafe;