import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import './boardstyle.css';
import AllBoardGames from './AllBoardGames';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {
    Form,
    Input,
    Tooltip,
    Select,
    AutoComplete,
    Button,
    Collapse,
    Card,
    List,
    Avatar,
    Skeleton,
    Pagination
} from "antd";


class HomeGames extends React.Component {
    state = {
        games: [],
        vision: ""
    };
    componentDidMount() {
        Axios.get( 'http://localhost:8010/proxy/game/hot_games/')
            .then(res => {
                const games_list = res.data;
                console.log(games_list)
                this.setState(prevState => {
                    return { games: games_list }
                })
            })
            
            
    }
    seeAll(){
        this.setState({vision:"true"});

    }
    caro(){
        return(
      
            <div style={{ backgroundColor: "black",paddingTop: "2%"}}>
                <h3 >THE HOT GAMES</h3>
                <h5 style={{fontSize: "9px"}}>Top 5 most rated games</h5>
                <Carousel  infiniteLoop useKeyboardArrows autoPlay showThumbs={false} width="100%"   >
                  {this.state.games.map(game => (
                    <body style={{backgroundColor: 'black'}}>
                    <div class="container" style={{marginRight: "80%"}}>
                    <img src={game.image}  style={{ verticalAlign: "middle",width:"30%",height: "80%",marginLeft: "4%"}}/>
                    <span style={{color: "yellow", marginLeft: "50px",marginTop: "200px",fontSize: "23px"}}>{game.name}</span>
                    <Link style={{color: "violet",float: "right",marginRight: "2%",marginTop: "15%",fontSize: "20px"}}onClick={()=>this.seeAll()}>see all</Link>
                    </div>
                    
                     </body>
                     
                    ))
                    }
                </Carousel>
                </div>
        );
    }


    render(){
        
         if(this.state.vision==="")return this.caro();
         else
         {return <AllBoardGames></AllBoardGames>}
    }

}
export default HomeGames;