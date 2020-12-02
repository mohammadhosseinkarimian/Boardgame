import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import '../../Style/design.scss';
import StarRatings from 'react-star-ratings';
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
        <h4 style={{ letterSpacing: '1.2px',marginLeft: '5%'}}>Choose the gameboard you want from the list below(Sorted by BGG Rating Descending).</h4>
        <h6 style={{ letterSpacing: '1.1px',marginLeft: '5%'}}>Tap on image to view boardgame's profile.</h6>
      <List style={{marginTop: '3%'}}
      size="large"
      itemLayout="horizontal"
      pagination={paginationProps}
      dataSource={this.state.games}
      renderItem={item => (
        <List.Item >
          <List.Item.Meta 
            avatar={<img src={item.image} style={{width: "100px",height: "110px"}}/>}
            title={<Link to={'/allgames/:'+item.id}   ><h5>{item.name} </h5></Link>}
            description={<div>
              
              <StarRatings
              rating={parseFloat( item.rate)}
              starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
              numberOfStars={10}
              name='rating' 
            />
            <h7></h7>
             </div>}
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
  
  