import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
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

const { Meta } = Card;
const { Panel } = Collapse;
class SingleGame extends React.Component {
    state = {
        id: "6",
        name: "Die Macher",
        description: "Die Macher is a game about seven sequential political races in different mmmmmmjjjjuuisiadddsijdalisdjsjidnjklivf sijdv fikgdihgfjjfgjhhjdfjfjfgjkgijgffjeejeirfifdsiiwiwiiiejejddcdcvjsdowirpoeutjrifvnjjkghfkjhnlifkeiueij",
        category: "action",
        image: "https://cf.geekdo-images.com/original/img/uqlrq_bQJqHpcaN7_7qocV5XfbU=/0x0/pic4718279.jpg",
        min_players: "3",
        max_players: "5",
        difficulty: "2.1505",
        rate: "7.63088",
    };

    componentDidMount(){
       const id=6
    Axios.get(this.proxyurl+'http://gameboard.pythonanywhere.com/game/game_info/'+id)
   .then(res=>{
     const game=res.data
     console.log(game)
    })
}

    render() {
        return (
            <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt={this.state.name} src={this.state.image} />}
            >
                <Meta title={this.state.name} description={this.state.description} />
                <Collapse  bordered={false} >
                    <Panel header="more" showArrow={false}>
                    <p><h3>category: </h3> {this.state.category}</p>
                    <p><h3>number of players: </h3> {this.state.min_players} to {this.state.max_players}</p>
                    <p><h3>difficulty: </h3> {this.state.difficulty}</p>
                    <p><h3>rate: </h3> {this.state.rate}</p>
                    </Panel>
                </Collapse>
            </Card>
        )
    }
}
export default SingleGame;



