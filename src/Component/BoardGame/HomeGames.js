import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../Style/design.scss';


import {
    Row, Col 
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
            
            <div style={{ backgroundColor: 'transparent',paddingTop: "2%",marginTop: "8%",height: '35vh',width: '90%',marginLeft: '5%'}}>
                
                <h3 ><span> THE HOT GAMES
                     < Link to='/allgames' style={{color: "white",float: "right",marginRight: "2%",fontSize: "20px"}}>see all</Link>
</span>
                </h3>

                <h5 style={{fontSize: "13px"}}>Top 20 most rated games</h5>
                
                <Carousel infiniteLoop  autoPlay  width="100%"  >
                    
                  {rows.map(game => (
                    <body style={{backgroundColor: '#303030',height: '35vh'}}>
                    <Row style={{marginLeft: '4%'}} justify='start'>
                    <Col span={6}><figure className="img-with-text" style={{textAlign: 'justify',height: '80%',width: '35%',marginTop: '7%'}}>
                    <Link to={'/allgames/:'+game[0].id}> <img src={game[0].image} height='54%' style={{width: '30%',minHeight: '80px',width: '100%'}}/></Link>
                    <figcaption style={{fontSize: "11px",color: 'whitesmoke',textAlign: 'center'}}>
                    {game[0].name}
                    </figcaption>
                        </figure>
                        </Col>
                        <Col span={6}><figure className="img-with-text" style={{textAlign: 'justify',height: '80%',width: '35%',marginTop: '7%'}}>
                    <Link to={'/allgames/:'+game[1].id}> <img src={game[1].image}  height='54%' style={{width: '30%',minHeight: '80px',width: '100%'}} /></Link>
                    <figcaption style={{fontSize: "11px",color: 'whitesmoke',textAlign: 'center'}}>
                    {game[1].name}
                    </figcaption>
                        </figure>
                        </Col>
                        <Col span={6}><figure className="img-with-text" style={{textAlign: 'justify',height: '80%',width: '35%',marginTop: '7%'}}>
                    <Link to={'/allgames/:'+game[2].id}> <img src={game[2].image}  height='54%' style={{width: '30%',minHeight: '80px',width: '100%'}}/></Link>
                    <figcaption style={{fontSize: "11px",color: 'whitesmoke',textAlign: 'center'}}>
                    {game[2].name}
                    </figcaption>
                        </figure>
                        </Col>
                        <Col span={6}><figure className="img-with-text" style={{textAlign: 'justify',height: '80%',width: '35%',marginTop: '7%'}}>
                    <Link to={'/allgames/:'+game[3].id}> <img src={game[3].image} height='54%' style={{width: '30%',minHeight: '100px',width: '100%'}} /></Link>
                    <figcaption style={{fontSize: "11px",color: 'whitesmoke',textAlign: 'center'}}>
                    {game[3].name}
                    </figcaption>
                        </figure>
                        </Col>
                    </Row>
                   
                   
                   
                    
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
