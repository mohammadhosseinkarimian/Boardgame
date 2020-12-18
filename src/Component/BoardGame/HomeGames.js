import React from "react";
import Axios from "axios";
import StarRatings from 'react-star-ratings';
import { GiTwoCoins} from "react-icons/gi";
import {  FaMapMarkerAlt,FaClock,FaPenNib,FaPhone,FaQuoteRight } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import 'antd/dist/antd.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../Style/design.scss';
import Im from '../../Style/a.png';

import {
    Row, Col ,Divider
} from "antd";


 class HomeGames extends React.Component {
    state = {
        games: [],
        cafes: [],
        vision: ""
    };
     componentDidMount() {
         Axios.get( 'http://localhost:8010/proxy/game/hot_games/')
            .then(res => {
                const games_list = res.data;
                this.setState(prevState => {
                    return { games: games_list }
                })
            })
            
            Axios.get( 'http://localhost:8010/proxy/cafe/day_cafe_list/')
            .then(res => {
                const cafes_list = res.data;
                this.setState(prevState => {
                    return { cafes: cafes_list }
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
          const arrays = this.state.cafes.reduce(function (arrays, key, index) { 
            return (index % 10 == 0 ? arrays.push([key]) 
              : arrays[arrays.length-1].push(key)) && arrays;
          }, []);

        return(
            
            <div style={{paddingTop: "2%",marginTop: "2%",height: 'max-content',width: '90%',marginLeft: '5%'}}>
                
                <h3 > THE HOT GAMES
                     
                </h3>
                <span>
                    
                <h5 style={{fontSize: "13px",verticalAlign: 'middle'}}>Top 15 most rated games
                < Link to='/allgames' style={{color: "white",float: "right",marginRight: "2%",fontSize: "20px",lineHeight: '0.5'}}>see all</Link>
                </h5>  </span>
                
                <Carousel infiniteLoop  autoPlay  width="100%" >
                    
                  {rows.map(game => (
                    <body style={{backgroundColor: 'transparent',height: '35vh',marginTop: '1%'}}>
                    <Row  justify='start'>
                    <Col span={8}>
                        <Row style={{borderRadius: '4%',background: '#333',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}>
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <h5 >{game[0].name}</h5>
                              
                                <StarRatings
                                 rating={parseFloat((parseFloat(game[0].rate)/2).toFixed(2))}
              
                                 starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
                                 numberOfStars={5}
                                 name='rating' 
                                 />
            <p style={{fontSize: '15px',fontFamily: 'Courier, monospace',marginTop: '9px'}}><FaQuoteRight style={{fill: 'orange'}}/> {game[0].description.substring(0,43)}...</p>

                                 </div>
                               </Col>

                           <Col span={12} >
                               <div className='roundedcircle'>
                               <Link to={'/allgames/:'+game[0].id}> <img src={game[0].image}  className='imageinside' /></Link>
    
                               </div>
                               </Col> 
                             
                        </Row>
                        </Col>
                        <Col span={8}>
                        <Row style={{borderRadius: '4%',background: '#333',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}>
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <h5 >{game[1].name}</h5>
                              
                                <StarRatings
                                 rating={parseFloat((parseFloat(game[1].rate)/2).toFixed(2))}
              
                                 starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
                                 numberOfStars={5}
                                 name='rating' 
                                 />
            <p style={{fontSize: '15px',fontFamily: 'Courier, monospace',marginTop: '9px'}}><FaQuoteRight style={{fill: 'orange'}}/> {game[1].description.substring(0,43)}...</p>

                                 </div>
                               </Col>

                           <Col span={12} >
                               <div className='roundedcircle'>
                               <Link to={'/allgames/:'+game[1].id}> <img src={game[1].image}  className='imageinside' /></Link>
    
                               </div>
                               </Col> 
                             
                        </Row>
                        </Col>
                        <Col span={8}>
                        <Row style={{borderRadius: '4%',background: '#333',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}>
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <h5 >{game[2].name}</h5>
                              
                                <StarRatings
                                 rating={parseFloat((parseFloat(game[2].rate)/2).toFixed(2))}
              
                                 starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
                                 numberOfStars={5}
                                 name='rating' 
                                 />
            <p style={{fontSize: '15px',fontFamily: 'Courier, monospace',marginTop: '9px'}}><FaQuoteRight style={{fill: 'orange'}}/> {game[2].description.substring(0,43)}...</p>

                                 </div>
                               </Col>

                           <Col span={12} >
                               <div className='roundedcircle'>
                               <Link to={'/allgames/:'+game[2].id}> <img src={game[2].image}  className='imageinside' /></Link>
    
                               </div>
                               </Col> 
                             
                        </Row>
                        </Col>
                    </Row>
                   
                   
                   
                   
                    
                     </body>
                     
                    ))
                    }
                </Carousel>
                <div style={{height: 'max-content',width: '100%'}}>
                <h3 > Cafes:
                     
                     </h3>
                     {arrays.map(cafe => (
                         <Row justify='start' style={{marginTop: '2%'}}>
                             <Col span={8} >
                             <Row style={{borderRadius: '4%',background: '#333',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}>
                             <Col span={12} >
                               <div>
                               <img src={cafe[0].gallery.length===0?Im:cafe[0].gallery[0]} className='imageinside' style={{maxWidth: '90%',width: '90%'}} />
    
                               </div>
                               </Col> 
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <Link to={'/allcafes/:'+cafe[0].id}> <h5 style={{paddingBottom: '3%'}}>{cafe[0].name}</h5></Link>

                        <h6 style={{alignContent: 'center'}}> <FaPhone style={{fill: 'rgb(22, 221, 111)'}}/>  {cafe[0].phone_number}</h6>
                        <h6 style={{borderBottom: '4px dotted gray',paddingBottom: '7%'}}> <FaMapMarkerAlt style={{fill: '#ff3434' }}/>  {cafe[0].city}</h6>

                        <h6><FaPenNib style={{fill: 'orange'}}/> {cafe[0].description}</h6>

                                 </div>
                               </Col>

                          
                             
                        </Row>
                             </Col>
                             <Col span={8} >
                             <Row style={{borderRadius: '4%',background: '#333',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}>
                             <Col span={12} >
                               <div>
                               <img src={cafe[1].gallery.length===0?Im:cafe[1].gallery[0]} className='imageinside' style={{maxWidth: '90%',width: '90%'}} />
    
                               </div>
                               </Col> 
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <Link to={'/allcafes/:'+cafe[1].id}> <h5 style={{paddingBottom: '3%'}}>{cafe[1].name}</h5></Link>

                        <h6 style={{alignContent: 'center'}}> <FaPhone style={{fill: 'rgb(22, 221, 111)'}}/>  {cafe[1].phone_number}</h6>
                        <h6 style={{borderBottom: '4px dotted gray',paddingBottom: '7%'}}> <FaMapMarkerAlt style={{fill: '#ff3434' }}/>  {cafe[1].city}</h6>

                        <h6><FaPenNib style={{fill: 'orange'}}/> {cafe[1].description}</h6>

                                 </div>
                               </Col>

                          
                             
                        </Row>
                             </Col><Col span={8} >
                             <Row style={{borderRadius: '4%',background: '#333',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}>
                             <Col span={12} >
                               <div>
                               <img src={cafe[2].gallery.length===0?Im:cafe[2].gallery[0]} className='imageinside' style={{maxWidth: '90%',width: '90%'}} />
    
                               </div>
                               </Col> 
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <Link to={'/allcafes/:'+cafe[2].id}> <h5 style={{paddingBottom: '3%'}}>{cafe[2].name}</h5></Link>

                        <h6 style={{alignContent: 'center'}}> <FaPhone style={{fill: 'rgb(22, 221, 111)'}}/>  {cafe[2].phone_number}</h6>
                        <h6 style={{borderBottom: '4px dotted gray',paddingBottom: '7%'}}> <FaMapMarkerAlt style={{fill: '#ff3434' }}/>  {cafe[2].city}</h6>

                        <h6><FaPenNib style={{fill: 'orange'}}/> {cafe[2].description}</h6>

                                 </div>
                               </Col>

                          
                             
                        </Row>
                             </Col>
                         </Row>
                     ))}
                </div>
                <div style={{alignContent: 'center'}}>
                <Row style={{marginLeft: '4%'}} justify='start'>
                    
                        <Col span={6}>
                        <Link to='/cafeform'><h5>click here to see cafe form</h5></Link>

                        </Col>
                        <Col>
                        <Link to='/community'><h5>click here to see community</h5></Link>

                        </Col>
                        
                    </Row>

                   

                   
                        
                    </div>
                </div>
        );
    }


    render(){
        
         return this.caro();
         
    }

}
export default HomeGames;
