import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Select,
  AutoComplete,
  Button,
  Collapse,
  Card ,
  List,
  Avatar, 
  Skeleton,
  Pagination 
} from "antd";

const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize: 5,
  
};

class AllBoardGames extends React.Component {
  state={
      id:"",
      name:"",
      description:"",
      category:"",
      image:"",
      min_players:"",
      max_players:"",
      difficulty:"",
      proxyurl : "",
      rate:"",
      games: []
      
      
  };
  proxyurl="https://cors-anywhere.herokuapp.com/";
  componentDidMount() {
    Axios.get(this.proxyurl+'http://gameboard.pythonanywhere.com/game/games_list/')
       .then(res=>{
         const games_list=res.data;
         this.setState(prevState => {
          console.log(games_list)
           return {games: games_list}
         })
       })
  }

  
  render(){
    return(
    <div>
    <List
    size="large"
    itemLayout="horizontal"
    pagination={paginationProps}
    dataSource={this.state.games}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.image} />}
          title={<Link to={`/boardgames/${item.id}`}>{item.name}</Link>}
          description={`rate:${item.rate}`}
        />
      </List.Item>
    )}
  />
  </div>
  );}
  }
  export default AllBoardGames;
  
  