import React from 'react';
import antd from "antd";
import axios from 'axios';
import '../../Style/design.scss';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AiFillDelete,AiFillClockCircle,AiOutlinePhone } from "react-icons/ai"
import { GiTwoCoins } from "react-icons/gi";
import { PlusOutlined } from '@ant-design/icons';
import 'font-awesome/css/font-awesome.min.css';
import FormItem from 'antd/lib/form/FormItem';
import {
    Form,
    Input,
    Select,
    Button,
    Card,
    List, Divider
} from "antd";
const proxyurl = "http://localhost:8010/proxy";

const { Meta } = Card;
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
        editbool: false
    }

    componentDidMount() {
        axios.get('http://localhost:8010/proxy/game/games_list/')
            .then(res => {
                const games_list = res.data;
                var dict = {}
                games_list.forEach(element => {
                    dict[element.id] = element.name;
                });

                this.setState({ allgames: dict })
            })

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
                console.log("errror")
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

            alert("play was deleted succesfully")
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
                    console.log("errror")
                }
                )

        })
            .catch((error) => {
                alert("cant delete play try again")
            }
            )

    }

    renderItems=()=>{
        return(
            this.state.dataSource.map(item=>(
                <Card title={item.game} extra={<a onClick={() => this.onClickdelete(item.id)} ><AiFillDelete /></a>} style={{ width: 300 }}>
                <p>  {item.game}</p>
               <p> {item.date}</p>
                </Card>
            )
               )
        )
        
    }

    render() {
        return (
            <div style={{ marginTop: '5%' }}>
                {/* <List
                    size="large"
                    itemLayout="horizontal"
                    dataSource={this.state.dataSource}
                    renderItem={item => (
                        <List.Item
                            actions={[<a onClick={() => this.onClickdelete(item.id)} >delete</a>]}
                        >
                            <List.Item.Meta
                                title={`${this.state.allgames[item.game]}`}
                                description={`${item.place} ${item.date}  `}
                            />
                        </List.Item>
                    )}
                /> */}
              
              {this.renderItems()}
                
               
            </div>
            


        )
    }
}

export default LogPlay;
