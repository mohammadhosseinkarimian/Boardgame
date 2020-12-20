import React from 'react';
import axios from 'axios';
import '../../Style/design.scss';
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete, } from "react-icons/ai"
import 'font-awesome/css/font-awesome.min.css';
import '../../Style/play.css'
import {
    Card,Row,
    Table,
    message
} from "antd";
const proxyurl = "http://localhost:8010/proxy";
const { Meta } = Card;
const tabledata=[]
const columns = [
    {
        title: 'Game',
        dataIndex: 'game',
        key: 'game',

    },
    {
        title: 'date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
    }]




class LogPlay extends React.Component {
    state = {
        dataSource: [],
        allgames: {},
        editbool: false,
        
    }
    
    componentDidMount() {


        axios.get(proxyurl + '/game/plays_list/', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        }
        ).then((res) => {
            const tmp = res.data;
            this.setState({ dataSource: tmp })
            this.state.dataSource.forEach(element => {
            
                tabledata.push({game: element.game.name,date: element.date, place: element.place, id: element.id})
            });
        })
            .catch((error) => {
                message.error('somthing went wrong')
            }
            )
        
    }

    onClickdelete = (id) => {
        axios.delete(proxyurl + "/game/edit_play/" + id + "/", {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        }
        ).then((res) => {

           message.success('play was deleted succesfully')
            axios.get(proxyurl + '/game/plays_list/', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Credentials': true,
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            }
            ).then((res) => {
                const tmp = res.data;
                console.log(tmp)
                this.setState({ dataSource: tmp })

            })
                .catch((error) => {
                    message.error('somthing went wrong')
                }
                )

        })
            .catch((error) => {
                message.error('cant delete play try again')
            }
            )

    }

    onClickedit = (id) => {
        window.location.href = '/editplay/:' + id
    }

    renderItems = () => {
        return (
            this.state.dataSource.map(item => (
                <Card className="play_card"
                    actions={
                        [
                            <AiFillDelete onClick={() => this.onClickdelete(item.id)} />,
                            <FaRegEdit onClick={() => this.onClickedit(item.id)} />
                        ]
                    }
                    
                        >
                            <div style={{marginTop:2}}>
                            <p> {item.game.name}</p>
                            <p> {item.place}</p>
                             <p> {item.date}</p> 
                            </div>
                   
                     
                    
                     
                                   
                </Card>
            )
            )
        )

    }

    render() {
        
        return (
            <div style={{ marginTop: '5%' }}>

               <Row>
              {this.renderItems()}
              </Row> 
            </div>
            
            
            



        )
    }
}

export default LogPlay;
