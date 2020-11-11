import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import "./App.css"
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
        games: []
    };
    proxyurl = "https://cors-anywhere.herokuapp.com/";
    componentDidMount() {
        Axios.get(this.proxyurl + 'http://gameboard.pythonanywhere.com/game/hot_games/')
            .then(res => {
                const games_list = res.data;
                console.log(games_list)
                this.setState(prevState => {
                    return { games: games_list }
                })
            })
            
            
    }

    render(){
        
        return(
            <div >
                <Carousel  infiniteLoop useKeyboardArrows autoPlay showThumbs={false} >
                  {this.state.games.map(game => (
                    <div>
                    <img src={game.image}  />
                   
                    </div>
                    ))
                    }
                </Carousel>
                </div>
        );
    }

}
export default HomeGames;