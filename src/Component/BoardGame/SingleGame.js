import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import './boardstyle.css'
import 'antd/dist/antd.css';
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

import 'font-awesome/css/font-awesome.min.css';

const { Meta } = Card;
const { Panel } = Collapse;
class SingleGame extends React.Component {
    state = {
        id: localStorage.getItem('game'),
        name: "",
        description: "",
        category: "",
        image: "",
        min_players: "",
        max_players: "",
        difficulty: "",
        rate: "",
    };

    componentDidMount(){
       const id=window.location.href.substring(32);
    Axios.get('http://localhost:8010/proxy/game/game_info/'+id)
   .then(res=>{
     const game=res.data;
     this.setState({name:game.name});
     this.setState({description:game.description});
     this.setState({category:game.category});
     this.setState({image:game.image});
     this.setState({min_players:game.min_players});
     this.setState({max_players:game.max_players});
     this.setState({difficulty:game.difficulty});
     this.setState({rate:game.rate});



    })
}

    render() {
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
        return (
            <div
                style={{ width: "100%", background: '272727'}}>
                    <div style={{width:"60%",marginTop:"5%",marginLeft: "25%"}}>
                    <img style={{width:"60%",height: '43vh',marginTop:"0vh",float: 'left',marginRight: '1rem'}} 
                    src={this.state.image} />
                   <br/>
                   <h4 style={{fontSize: '21',color: 'white'}}>{"Name: "+this.state.name }</h4>
                    <p style={{fontSize: '17px',color: 'whitesmoke',marginLeft: '5%'}}>{`${this.state.rate}`.substring(0,3)}<i className="fa fa-star fa-star" style={{color: 'gold',fontSize: '23'}}/> </p>
                    <p style={{fontSize: '17px',color: 'whitesmoke',marginLeft: '5%'}}>{`Difficulty: ${this.state.difficulty}`.substring(0,15)}</p>
                    <p style={{fontSize: '17px',color: 'whitesmoke',marginLeft: '5%'}}>{'Range of players: '+this.state.min_players+" to "+this.state.max_players}</p>
                    

                    </div>
                   <div style={{textAlign: 'center',marginTop: '10%'}}>

                       
                   </div>
                   <h5 style={{fontSize: '16px',color: 'whitesmoke',marginLeft: '1%',marginTop: '3%'}}  >{"Categories: "+ this.state.category}</h5>
                 
                <Collapse  bordered={false} >
                    <Panel header="more" showArrow={false}>
                    <h5 style={{fontSize: '15px',color: 'whitesmoke',marginLeft: '0%'}} >{this.state.description}</h5>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}
export default SingleGame;



