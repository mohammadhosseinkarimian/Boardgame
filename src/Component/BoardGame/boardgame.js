import React from "react";
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Select,
  AutoComplete,
  Button,
  Collapse,
  Card 
} from "antd";


const { Meta } = Card;
const { Panel } = Collapse;



class BoardGame extends React.Component {
state={
    id:"",
    name:"",
    description:"",
    category:"",
    images:"",
    min_players:"",
    max_players:"",
    difficulty:""
    // id:"02",
    // name:"pantagon",
    // description:"asdfghjkl;;lkjhgswerty",
    // category:"dont know",
    // images:"./p.jpg",
    // min_players:"2",
    // max_players:"3",
    // difficulty:"1"

}



render(){
    return(
        
        <div>
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={this.state.images} />}
        >
          <Collapse defaultActiveKey={['1']} bordered={false} expandIconPosition="right">
          <Panel header={this.state.name} >
          <p>difficulty:{this.state.difficulty}</p>
          <p>category:{this.state.category}</p>
          <p>range of player numbers {this.state.min_players} to {this.state.max_players}</p>
          <p>{<Meta title="description" description={this.state.description} />}</p>
          </Panel>
          </Collapse>
        </Card>
        </div>

    );
}


}
export default BoardGame;



