import React, { useState } from 'react';
import antd, { AutoComplete } from "antd";
import 'antd/dist/antd.css';
import './App.css';
import FormItem from 'antd/lib/form/FormItem';
import Axios from 'axios';
import Autocomplete from'react-autocomplete';
import { Select } from 'antd';
import Item from 'antd/lib/list/Item';
const { Option } = Select;
const proxyurl = "http://localhost:8010/proxy";
class SearchShow extends React.Component {
  state={
    suggestlist:[],
    selected_game:"",
  };
  
 onSelect=(value)=> {
   console.log(value)
  this.setState({selected_game:value}, () => {
    console.log(this.state.selected_game, 'dealersOverallTotal1')})

  console.log(this.state.selected_game)
}

onSearch=(value)=> {
  Axios.get(proxyurl + "/game/search_game/name?search=" + value)
    .then(res => {
      const tmp = res.data.results;
      console.log(tmp);
      this.setState(prevState => {
        return { suggestlist: tmp }
      })
    })
}

render(){
  return(
    <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onSearch={this.onSearch}
    onSelect={this.onSelect}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    
  >
    {this.state.suggestlist.map(item => (
                    <Option value={item.id}>{item.name}</Option>
                    ))
                    }
    
  </Select>
);
}
  
}
export default SearchShow;

