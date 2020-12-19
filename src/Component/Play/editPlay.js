import React from 'react';
import antd, { Row, Col } from "antd";
import Axios from 'axios';
import '../../Style/design.scss';
import FormItem from 'antd/lib/form/FormItem';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Tabs,
    Checkbox,
    message,
    AutoComplete
} from "antd";
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const obj={id:0,name:""}
const proxyurl = "http://localhost:8010/proxy";
const user_username = localStorage.getItem('user')
const layout = {

    wrapperCol: {
        span: 0,
    },
};

class EditPlay extends React.Component {
    state = {
        date: "",
        place: "",
        msg: "",
        players: [],
        suggestlist_game: [],
        suggestlist_user: [],
        selected_game: "",
        selected_user: "",
        play_id: "",
        deafult_players: [],
        deafult_player_username: [],
        suggestlist_cafe: [],
        selected_cafe: "",
        game_name:""


    }
    componentDidMount() {
        const tmp = this.props.match.params.id;
        this.state.play_id = JSON.stringify(tmp).split(':').pop()
        Axios.get(proxyurl + "/game/edit_play/" + this.state.play_id.split('"')[0] + '/',
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Credentials': true,
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            }
        )
            .then(res => {
                let temp = []
                console.log(res.data)
                this.setState({ date: res.data.date });
                this.setState({ place: res.data.place });
                this.setState({ selected_game: res.data.game });
                this.setState({ semi_players: res.data.semi_players });
                this.setState({ players: res.data.players })
                this.setState({game_name: res.data.game.name })
                res.data.players.map(item => {
                    temp.push(item.username)
                })
                this.setState({ deafult_player_username: temp })
                console.log(res.data.players)
            })
            
            .catch(error => {
                message.error('somthing went wrong')
            })

    }
    onSelectuser = (value) => {

        if (value.includes("(not a user)")) {
            this.state.semi_players += value + ",";
        }
        else {
            if (this.state.players.includes({ "username": value }) == false) {
                var dict = { "username": value }
                this.state.players.push(dict);
                this.setState({ selected_user: value })
                this.setState({ suggestlist_user: [] })
            }
        }

    }

    onUserSearch = (value) => {
        let searchvalue = value
        let tmp = []
        if (typeof searchvalue !== "string" && searchvalue !== "") {
            searchvalue = ""
        }
        else {
            tmp.push({ id: null, username: searchvalue + "(not a user)", email: "notAuser@gmail.com" })
        }
        Axios.get(proxyurl + "/game/search_user/username/?search=" + searchvalue)
            .then(res => {
                tmp = [...tmp, ...res.data.results]
                this.setState({ suggestlist_user: tmp });
            })

    }

    onSelectgame = (value) => {
        const tmp={name:value[0],id:value[1]}
        this.setState({game_name:value[0]})
        this.setState({ selected_game: tmp })
        console.log(tmp)
    }
    onSearchgame = (value) => {
        Axios.get(proxyurl + "/game/search_game/name?search=" + value)
            .then(res => {
                const tmp = res.data.results;
                this.setState(prevState => {
                    return { suggestlist_game: tmp }
                })
            })
    }
    onyearChangedate = (value) => {
        if (value != null)
            this.setState({ date: value.format(dateFormat) })
    }
    onSave = (e) => {
        e.preventDefault();
        e.persist()
        const data = {
            players: this.state.players,
            game: this.state.selected_game,
            date: this.state.date,
            place: this.state.place,
            semi_players: this.state.semi_players

        }
        console.log(JSON.stringify(data))
        Axios.put(proxyurl + '/game/edit_play/' + this.state.play_id.split('"')[0] + '/', JSON.stringify(data)
            , {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Credentials': true,
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            }
        )
            .then((res) => {

                alert("play was update succesfully")
            })
            .catch((error) => {
                alert("something went wrong please try again.")
            }
            )


    }
 


    onSelectCafe = (value) => {

        this.setState({ selected_cafe: value })
        this.setState({ place: value })
    
      }
      onSearchcafe = (value) => {
        Axios.get(proxyurl + "/cafe/search_cafe/name?search=" + value)
          .then(res => {
            const tmp = res.data.results;
            this.setState(prevState => {
              return { suggestlist_cafe: tmp }
            })
          })
      }

    render() {

        return (
            <div className="Login_container" style={{ backgroundColor: '#333' }}>
                <Form   {...layout}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Play" key="1">
                            <Form.Item style={{ width: '100%' }}
                                name="date"
                                rules={[
                                    {
                                        type: "date",
                                        message: "The input is not valid year!",
                                    },
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <DatePicker allowEmpty={false} name="date" format={dateFormat} style={{ width: '100%' }} placeholder={this.state.date} onChange={this.onyearChangedate} picker="date" />
                            </Form.Item>
                            <Form.Item>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder={this.state.game_name}
                                    onSearch={this.onSearchgame}
                                    onSelect={this.onSelectgame}
                                    
                                >
                                     {
                                    this.state.suggestlist_game.map(item => (
                                        <Option title={item.name} value= {[item.name,item.id]}>{item.name}</Option>
                                    ))
                                    } 

                                </Select>
                            </Form.Item>
                           
                                {/* {
                                    this.state.deafult_players.forEach(element => {
                                        this.state.deafult_player_username.push(element)
                                    })
                                } */}
                                {/* <Select

                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    
                                    //placeholder={this.state.deafult_player_username.join(',')}
                                    defaultValue={this.state.deafult_player_username}
                                    onSearch={this.onUserSearch}
                                    onSelect={this.onSelectuser}

                                >
                                    {
                                        this.state.suggestlist_user.map(d => (
                                            <Option key={d.username}>{d.username}</Option>
                                        ))}
                                </Select> */}
                           


                            <FormItem>
                                <AutoComplete
                                    onSelect={this.onSelectCafe}
                                    onSearch={this.onSearchcafe}
                                    placeholder={this.state.place}
                                    onChange={this.onSelectCafe}
                                >

                                    {this.state.suggestlist_cafe.map(item => (
                                        <Option value={item.name}>{item.name}</Option>
                                    ))
                                    }
                                </AutoComplete>
                            </FormItem>

                            <Form.Item >
                                <Button className="btn btn-primary" style={{ width: '100%' }} shape="round" onClick={this.onSave} >Save</Button>
                            </Form.Item>
                        </TabPane>
                    </Tabs>


                </Form>
            </div>

        );
    }
}
export default EditPlay