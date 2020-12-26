import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
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
    Card,
    Row, Col 
} from "antd";

import 'font-awesome/css/font-awesome.min.css';

class SingleCommunity extends React.Component {
    state = {
        name: "",
        owner: "",
        image: "",
        member: [],
        locked: false,
        info: "",
        events: []
    };

  /*  componentDidMount(){
     const id=window.location.href.substring(32);
    Axios.get('http://localhost:8010/proxy/game/game_info/'+id)
   .then(res=>{



    })
}*/
    render() {
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
        return (
            <div className="EditProfile_container"
                style={{ width: "70%",marginTop: '3%',height: '80vh'}}>
                    <Row className='banner' style={{width: '100%',height: '7vh',marginTop: '-4%'}}>
                                   <h3 className='centeredtext' style={{marginTop: '0.5%'}}>Soccer team</h3>

                    </Row>
                    <Row  >
                            
                        
                        <Col span={4} className='communitystyle'>
                        <h4 className='centeredtext' style={{marginTop: '6%'}}>Members</h4>

                        </Col>
                        <Col span={16} className='communitystyle' style={{marginLeft: "2%"}}>
                                <h4 style={{marginTop: '1%',textAlign: "center"}}>Event  </h4>

                        </Col>
                        <Col span={3} className='communitystyle' style={{marginLeft: "2%"}}>
                        <h4 className='centeredtext' style={{marginTop: '6%'}}>Events</h4>
 </Col>
             
                    </Row>
        
            </div>
        )
    }
}
export default SingleCommunity;



