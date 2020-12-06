import React from 'react';
import antd from "antd";
import axios from 'axios';
import '../../Style/design.scss';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PlusOutlined } from '@ant-design/icons';
import 'font-awesome/css/font-awesome.min.css';
import FormItem from 'antd/lib/form/FormItem';
import {
    Form,
    Input,
    Select,
    Button,
    Table,
    List, Typography, Divider
} from "antd";
const proxyurl = "http://localhost:8010/proxy";
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
        allgames: {}
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

    render() {
        return (
            <div style={{marginTop: '5%'}}>
                <List
                    size="large"
                    itemLayout="horizontal"
                    dataSource={this.state.dataSource}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<h5>`${this.state.allgames[item.game]}`</h5>}
                                description={<h6>`${item.place.toString().replace('`',"")}        ${item.date.toString().replace('`',"")}    `</h6>}
                            />
                        </List.Item>
                    )}
                />
            </div>


        )
    }
}
export default LogPlay;
