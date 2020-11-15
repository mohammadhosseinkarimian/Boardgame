import React from 'react';
import antd from "antd";
import Axios from 'axios';
import moment from 'moment';
//import './App.css';
import { PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import {
  Form,
  Input,
  Select,
  Divider,
  Button,
  Mentions,
  DatePicker,

} from "antd";


const layout = {

  wrapperCol: {
    span: 0,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};
const { RangePicker } = DatePicker;
const { Option } = Select;
const proxyurl = "http://localhost:8010/proxy";
const dateFormat = 'YYYY-MM-DD';
let index = 0;

class AddPlay extends React.Component {
  state = {
    date: "2020-1-1",
    place: "",
    msg: "",
    players: [],
    suggestlist_game: [],
    suggestlist_user: [],
    selected_game: "",
    selected_user: "",
  }


  onSelectuser = (value) => {

    var dict = { "username": value }
    this.state.players.push(dict);
    this.setState({ selected_user: value }, () => {
      console.log(this.state.selected_user, 'dealersOverallTotal1')
    })

  }

  handleChange = (value) => {
    Axios.get(proxyurl + "/game/search_user/username/?search=" + value)
      .then(res => {
        const tmp = res.data.results;
        this.setState(prevState => {
          return { suggestlist_user: tmp }
        })
      })
  }

  onSelectgame = (value) => {
    this.setState({ selected_game: value }, () => {
      console.log(this.state.selected_game, 'dealersOverallTotal1')
    })
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
    if(value!=null)
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

    }
    console.log(JSON.stringify(data))
    Axios.post(proxyurl + '/game/create_play/', JSON.stringify(data)
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

        this.setState({ msg: "done" });
        console.log(this.state.msg)
      })
      .catch((error) => {
        this.setState({ msg: "something went wrong please try again." });
        console.log(this.state.msg)
      }
      )


  }
  onPlaceChange = (val) => {
    this.setState({ place: val.target.value })
  }


  render() {
    const { items, name } = this.state;
    return (
      <div className="playLog_container">
        <Form   {...layout}>
          <Form.Item
            name="date"
            label="When did you play?"
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
            <DatePicker allowEmpty={false} name="date" format={dateFormat} defaultValue={moment('2020-1-1')} onChange={this.onyearChangedate} picker="date" />
          </Form.Item>
          <Form.Item>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a game"
              optionFilterProp="children"
              onSearch={this.onSearchgame}
              onSelect={this.onSelectgame}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }

            >
              {this.state.suggestlist_game.map(item => (
                <Option value={item.id}>{item.name}</Option>
              ))
              }

            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="players"
              defaultValue={[]}
              filterOption={false}
              onChange={this.handleChange}
              onSearch={this.handleChange}
              onSelect={this.onSelectuser}
            >
              {
                this.state.suggestlist_user.map(d => (
                  <Option key={d.username}>{d.username}</Option>
                ))}
            </Select>
          </Form.Item>

          <FormItem>
            <Input onChange={this.onPlaceChange} placeholder="Where did you play?" />
          </FormItem>


          <Form.Item >
            <Button style={{ background: "yellow", borderColor: "yellow",color:"black" }} type="primary" shape="round" onClick={this.onSave} >Save</Button>
          </Form.Item>
        </Form>
      </div>

    );
  }


}

export default AddPlay;

