import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import '../../Style/design.scss';

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
  pageSize:20
  
  
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
      games: [],
      game:"",
      vision:""
      
      
  };
  componentDidMount() {
    
    Axios.get('http://localhost:8010/proxy/game/games_list/')
       .then(res=>{
         const games_list=res.data;
         this.setState(prevState => {
          console.log(games_list)
           return {games: games_list}
         })
       })
  }
  
  
  allBoard(){
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>

    return(

      <body style={{background: 'transparent',marginTop: '5%',clear: 'both'}} >
      <List
      size="large"
      itemLayout="horizontal"
      pagination={paginationProps}
      dataSource={this.state.games}
      renderItem={item => (
        <List.Item style={{border: 'transparent'}}>
          <List.Item.Meta 
            avatar={<Avatar src={item.image} style={{width: "60px",height: "60px"}}/>}
            title={<Link to={'/allgames/:'+item.id} style={{color: 'whitesmoke'}}  >{item.name}</Link>}
            description={<p style={{color: 'silver',fontSize: '10'}}>{`${item.rate}`.substring(0,3)+" "}<i className="fa fa-star fa-star" style={{color: 'gold',fontSize: '23'}}/></p>}

/>
        </List.Item>
      )}
    />
    </body>
    );
  }
  render(){
     return this.allBoard();
         
    }
  }
  export default AllBoardGames;
  
  