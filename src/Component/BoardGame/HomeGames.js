import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import './boardstyle.css';
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
    Pagination,
    Alert
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
        const rows = this.state.games.reduce(function (rows, key, index) { 
            return (index % 4 == 0 ? rows.push([key]) 
              : rows[rows.length-1].push(key)) && rows;
          }, []);
        return(
      
            <div style={{ backgroundColor: '#303030',paddingTop: "2%",marginTop: "8%",height: '35vh'}}>
                
                <h3 ><span> THE HOT GAMES
                     < Link to='/allgames' style={{color: "white",float: "right",marginRight: "2%",fontSize: "20px"}}>see all</Link>
</span>
                </h3>

                <h5 style={{fontSize: "13px"}}>Top 5 most rated games</h5>
                
                <Carousel  infiniteLoop useKeyboardArrows autoPlay showThumbs={false} width="100%"  >
                    
                  {rows.map(game => (
                    <body style={{backgroundColor: '#303030',height: '26vh'}}>
                    <div class="container" style={{marginRight: "80%"}}>
                    <div class="member" >
                    <span>
                   <Link to={'/allgames/:'+game[0].id}> <img src={game[0].image} className="img-responsive" style={{ width:"18%",height: "60%"}}/></Link>
                    <div class="name"  style={{fontSize: "11px",color: 'whitesmoke',width: '8%',marginLeft: '1%'}}>{game[0].name}</div></span>
                    <span>
                <Link to={'/allgames/:'+game[1].id}>  <img src={game[1].image} className="img-responsive " style={{ width:"18%",height: "60%",marginLeft: '25%'}}/></Link>  
                    <div class="name" style={{fontSize: "11px",color: 'whitesmoke',marginLeft: '21%',width: '8%'}}>{game[1].name}</div>
                    </span>
                    </div>
                    <div class="member">
                    <span>
                    <Link to={'/allgames/:'+game[2].id}>    <img src={game[2].image} className="img-responsive " style={{ width:"18%",height: "60%"}}/></Link>  
                    <div class="name" style={{fontSize: "11px",color: 'whitesmoke',width: '8%',marginLeft: '1%'}}>{game[2].name}</div></span>
                    <span>
                    <Link to={'/allgames/:'+game[3].id}>   <img src={game[3].image} className="img-responsive " style={{ width:"18%",height: "60%",marginLeft: '25%'}}/></Link>  
                    <div class="name" style={{fontSize: "11px",color: 'whitesmoke',marginLeft: '22%',width: '8%'}}>{game[3].name}</div>
                    </span>
                    </div>
                    </div>
                    
                     </body>
                     
                    ))
                    }
                </Carousel>
                </div>
        );
    }


    render(){
        
         return this.caro();
         
    }

}
export default HomeGames;