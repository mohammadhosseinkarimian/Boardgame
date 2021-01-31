import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import '../../Style/design.scss';
import 'antd/dist/antd.css';
import {SiGooglecalendar} from "react-icons/si"
import {MdPlace} from "react-icons/md"
import {FaClock} from "react-icons/fa"
import {RiGroupFill}  from "react-icons/ri"
import eventpic from '../SingleCommunity/event.jpg'
import {
    List,
    Avatar,
    Row, Col,
    Tabs,
    Button,
    Card, 
} from "antd";
import 'font-awesome/css/font-awesome.min.css';
const { TabPane } = Tabs;
const username=localStorage.getItem('user')
//const proxyUrl='http://gameboard.pythonanywhere.com';
const proxyUrl=localStorage.getItem('url');

class SingleCommunity extends React.Component {
    state = {
        name: "",
        owner: "",
        image: "",
        members: [],
        description: "",
        lock: false,
        events: [],
        is_a_member: false,
        members_username:[],
        event_image:"",
        id:'',
        Com: []
     
    };

    componentDidMount() {
        const id=window.location.href.substring(33)
       //this.setState({id:id})
        localStorage.setItem('com_id',id)
        Axios.get(proxyUrl+'/community/community_info/' + id, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Credentials": true,
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }).then(res => {
            console.log(res.data)
            this.setState({ name: res.data.name })
            this.setState({ Com: res.data })

            this.setState({ image: res.data.image })
            this.setState({ description: res.data.description })
            this.setState({ owner: res.data.owner })
            this.setState({ lock: res.data.lock })
            this.setState({ members: res.data.members })
            this.setState({ events: res.data.events })
            
           
            
        })
       
    }
    onClickJoin=()=>{
        
        Axios.put(proxyUrl+'/community/join_community/'+localStorage.getItem('com_id')+'/',JSON.stringify(this.state.Com), {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Credentials": true,
                'Accept': "application/json",
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
            },
        }).then(
            res => {
                console.log(res.data)
                window.location.reload()
            }
        )
    }
    onClickLeave=()=>{
     
            Axios.put(proxyUrl+'/community/leave_community/'+localStorage.getItem('com_id')+'/',JSON.stringify(this.state.Com), {
                headers: {
         'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials':true,
          'Accept' : 'application/json',
          'Authorization' :`Bearer ${localStorage.getItem('access')}`
                },
            }).then(
                res => {
                    console.log(res.data)
                    window.location.reload()
                }
            ).catch(()=>{
                alert(localStorage.getItem('com_id'))
            })
        
      
    }
    onClickaddEvent=()=>{
        window.location.href='/event'
    }
    render() {
        return (
            <div className="EditProfile_container"
                style={{ width: "90%", marginTop: '3%',borderRadius: '6px' }}>
                <Row style={{ marginBottom: '2%' }}>

                    <Avatar className='avatarstyle'
                        style={{ marginLeft: '45%' }}
                        src={this.state.image.base64}
                        title={this.state.name}
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    >
                        {this.state.name[0]}
                    </Avatar>
                </Row>
                <Row >
                    {this.state.members.map(element => {this.state.members_username.push(element.username) })}
                    <Col span={18}>
                        <h3 style={{ color: 'hsl(22, 94%, 49%)', marginBottom: '2%' }}>{this.state.name}</h3>
                    </Col>
                    <Col span={5}>
                    <span hidden={!this.state.members_username.includes(localStorage.getItem('user'))}  >
                    <Button onClick={this.onClickLeave} type="primary"  style={{marginLeft: '10%'}}>
                    Leave 
                    </Button>
                    <Button onClick={this.onClickaddEvent} type="primary"  style={{marginLeft: '10%'}}>
                    Add Event
                    </Button>
                    </span>
                    <span hidden={this.state.members_username.includes(localStorage.getItem('user'))}  >
                    <Button onClick={this.onClickJoin} type="primary"  style={{marginLeft: '10%'}}>
                    Join 
                    </Button>
                    </span>
                    </Col>
                </Row>


                <Row >
                    <Col span={18} className='communitystyle' style={{borderRadius: '10px'}}>
                        {this.state.events.map(event=>(
                            <Row className='hoversingleevent' style={{width: '100%'}} >
                            <div  style={{width: '100%'}} className='event'>
                                     <Col span={6}>
                                     <div >
                                        
                                     <img className='event_pic' src={event.gallery.length==0 ? eventpic :event.gallery[0].base64} /> 
                                    </div> 
                                </Col> 
                                 

                                <Col span={6} >
                                    <div >
                                    <h5 ><MdPlace /> {event.place ===''?'-':event.place}</h5>
                                    </div>
                                </Col>
                                <Col span={12} >
                                    <div >
                                    <h6 ><SiGooglecalendar /> {event.date}</h6>
                                    <h6 ><FaClock /> {event.time}</h6>
                                    <h6 ><RiGroupFill /> players: {event.maxMember}</h6>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                        

                        ))
                        }
                            
                    </Col>
                    <Col span={4} className='communitystyle' style={{ marginLeft: "2%",borderRadius: '10px' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.members}
                            renderItem={item => (

                                <List.Item >
                                    <List.Item.Meta 
                                        avatar={<Avatar size='large' className='memberprofile' style={{width: '4vw',height: '4vw',lineHeight: '4vw' ,display: 'flex',alignItems: 'center'}} src={item.avatar} >{item.username[0]}</Avatar>}
                                        title={<h5 style={{marginTop: '16%',fontSize: '19px'}}>{item.username}</h5>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>

            </div>
        )
    }
}
export default SingleCommunity;


