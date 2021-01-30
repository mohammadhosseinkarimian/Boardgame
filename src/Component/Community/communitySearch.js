import React, { useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Select } from 'antd';


const { Option } = Select;
const proxyurl = "http://gameboard.pythonanywhere.com";
class CommunitySearch extends React.Component {
    state = {
        suggestlist: [],
        selected_com: "1",
    };

    onSelect = (value) => {

        this.setState({ selected_com: value }, () => {
            console.log(this.state.selected_com, 'dealersOverallTotal1')
        })


    }
    onSearch = (value) => {
        axios.get(proxyurl + "/community/search_community/?search=" + value)
            .then(res => {
                const tmp = res.data.results;
                const final=[];
                tmp.forEach(com => {
                    if(com.lock===false)
                    {
                        final.push(com)
                    }
                });
                console.log(tmp);
                this.setState(prevState => {
                    return { suggestlist: final }
                })
            })
    }

    render() {
        return (
            <div>
                <Select
                    showSearch
                    style={{ width: "60%", height: '3vh'}}

                    placeholder="Search"
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
                 </div>

        );
    }

}
export default CommunitySearch;