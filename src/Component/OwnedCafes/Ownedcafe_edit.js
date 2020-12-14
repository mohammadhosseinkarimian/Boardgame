import React from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import CafeMap from "../Map/Map";
import Gallery from './gallery'
import '../../Style/design.scss';
import Mapir from "mapir-react-component";
import {
  Form,
  Input,
  Tooltip,
  InputNumber,
  AutoComplete,
  Button,
  Select,
  Divider,
  TimePicker,
  Upload,
  message,
  Modal
} from "antd";
import axios from 'axios';
import "antd/dist/antd.css";
import { QuestionCircleOutlined, CheckCircleOutlined,DeleteFilled,CheckCircleFilled} from "@ant-design/icons";
const { RangePicker } = TimePicker;
const { Option } = Select;
const { Dragger } = Upload;
let index = 0;
let base64="";
const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3In0.eyJhdWQiOiIxMTU3MyIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3IiwiaWF0IjoxNjA2MDM1OTYwLCJuYmYiOjE2MDYwMzU5NjAsImV4cCI6MTYwODU0MTU2MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.GlBztlovbk9H-x4WErTuD3Cth2bp1Bd4myRJ96uOEYOy3LlK2RQEq-4G3hPDQ8IGuEq18vmBakeh7UNg0OA1BCFb5AwDUEl7kzO4wmZ6-AZrGo92b9AQ--5aGLhqUEYcTi0Y0DXOxviyeBM49eHGzmm6Oa0bJ1eRvDG6C07UH4MvMNfv0xwpSMoB9czJSwyfUYzXR9P0St4-ayv6nxOmsAiDUb-1gfUCNff-HHiiLq0z_eVa0Fy_Vj11aC0smz1T7_qQvzMkOhHGptxYDICqNFXYpgNjf_eELdk67_DLrn6-bG5HNC82gr4ZEeFOmuh7Ka5jdl_AMM09oAT1UypXNQ", //Mapir api key

        "Mapir-SDK": "reactjs",
      },
    };
  },
});
const mapdetail={CafeMap}
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
        span: 0,
    },
    sm: {
        span: 24,
    },
},
};
const tailFormItemLayout = {
wrapperCol: {
    xs: {
        span: 24,
        offset: 8,
    },
    sm: {
        span: 24,
        offset: 0,
    },
},
};

class Cafeedit extends React.Component {
  state = {
    Avatar: "",
    name: "",
    Description: "",
    selected_game:"",
    List_of_board_games: [],
    suggestlist_game:[],
    //items: ["Chess", "tic-tac-toe", "monopoly"],
    Price: "",
    Open_time: "00:00",
    Close_time: "00:00",
    Telephone: "",
    lat:"",
    lon:"",
    msg: "",
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    necessary_inputs:"",
    accept:false,
    massage:"",
    done:"",
    edit:"",
    Gamestring:[],
    latitude: "",
    longitude: "",

  };
  onFinish = (values) => {
    console.log("Received values of form: ", values);
};
onChange = (e) => {
    e.persist();
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState(() => {
        return {
            [e.target.name]: e.target.value,
        };
    });
    console.log(this.state);
};
proxyurl= "http://localhost:8010/proxy";

onSaveGeneral = (e) => {
    if((this.state.edit==="true"))
   { e.preventDefault();
     let list=(localStorage.getItem('base64'));
     console.log(JSON.parse(list))
     const data={
      name:this.state.name,
      description:this.state.Description,
      price:this.state.Price,
      open_time:this.state.Open_time,
      close_time:this.state.Close_time,
      phone_number:this.state.Telephone,
      games:this.state.List_of_board_games,
      gallery:JSON.parse(list),
      latitude:localStorage.getItem('lat'),
      longitude:localStorage.getItem('lng'),
      city:localStorage.getItem('city')

  }

    axios.put(this.proxyurl+'/auth/edit_profile/',JSON.stringify(data),{headers:{
        'Content-Type' : 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
).then((res)=>{  
    this.setState({edit:""});
     this.setState({msg:"done"});
     this.setState({loggedIn:""});
     
     localStorage.setItem('avatar',data.avatar);
     localStorage.setItem('email',data.email);
     this.setState({done:""});
     this.getInfo();


} )
.catch((error)=>
{
 this.setState({edit:""});
 this.setState({loggedIn:""});
 this.setState({msg:"something went wrong please try again."});
        } 
        )
    
    
    }

    else
    {
        this.setState({msg:"You haven't changed any information."});
        this.setState({loggedIn:""});
    }

}

getInfo=(e)=>
{
    
    if(this.state.done==="")
    {
let cafeid=localStorage.getItem("cafeid")    
    axios.get(this.proxyurl+'/cafe/edit_cafe/'+cafeid,{headers:{
        'Content-Type' : 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
).then((res)=>{  
    
    this.setState({name:res.data.name});
    this.setState({description:res.data.description});
    this.setState({List_of_board_games:res.data.games});
    this.setState({open_time:res.data.open_time});
    this.setState({close_time:res.data.close_time});
    this.setState({price:res.data.price});
    this.setState({Telephone:res.data.Telephone});
    this.state.List_of_board_games.forEach((element) => {
      this.state.Gamestring.push(element.name)
      });
console.log(this.state.Gamestring)
this.setState({ latitude: res.data.latitude });
this.setState({ longitude: res.data.longitude });
this.setState({done:"yes"});
})
.catch((error)=>
{

        } 
        )
    
    }

}
onSearchgame = (value) => {
  axios.get(this.proxyurl + "/game/search_game/name?search=" + value)
    .then(res => {
      const tmp = res.data.results;
      this.setState(prevState => {
        return { suggestlist_game: tmp }
      })
    })
};

onSelectgame = (value) => {
  var dict = { "id": value }
  this.state.List_of_board_games.push(dict);
  this.setState({ selected_game: value }, () => {
    console.log(this.state.selected_game, 'dealersOverallTotal1')
  })
};
componentDidMount() {
    this.getInfo();
}

    render() {
        return (   
            <div className="EditProfile_container" style={{with:'36%'}}>
       
        <Form
          {...formItemLayout}
          // form={this.form}
          name="register-cafe"
          ref={(el) => (this.myFormRef = el)}
          onFinish={this.onSubmit}
          autocomplete="off"

          scrollToFirstError
          //onSubmit={this.onSubmit.bind(this)}
        >
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="There was something wrong with the server please try again"?
        "There was something wrong with the server please try again":""}</p> */}
         
          <Form.Item
            name="name"
            onChange={this.onChange}
            rules={[
              {
                required: true,
                message: "Please input cafename!",
                whitespace: true,
              },
            ]}
          ><p> <span style={{color:"red"}}>*</span>cafe name :&nbsp;</p>
            <Input
              required
              name="name"
              placeholder={this.state.name===""?"last name":this.state.name+" (optional)"}
              onChange={(this.onChange, this.nameChange)}
            />
          </Form.Item>
          
          <Form.Item
            name="Description"
            rules={[
              {
                required: true,
                message: "Please input cafe address and some necessary description !",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          >  <p> <span style={{color:"red"}}>*</span>
          Description :&nbsp;
          <Tooltip title="Type address and some descriptions about caffe">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
            <Input.TextArea
              required
              name="Description"
              placeholder={this.state.description===""?"last name":this.state.description+" (optional)"}
              onChange={(this.onChange, this.descriptionChange)}
            />
            </Form.Item>
           <Form.Item
            rules={[
              {
                required: false,
                message: "Select Board games of caffe",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          ><p>
          Board games :&nbsp;
          <Tooltip title="What board games are there in the cafe?">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
       <div>
           <Select
           mode="multiple"
              showSearch
              style={{ width: '100%' }}
              defaultValue={this.state.Gamestring}
              optionFilterProp="children"
              onSearch={this.onSearchgame}
              onSelect={this.onSelectgame}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }

            >
              {this.state.suggestlist_game.map(i => (
                <Option value={i.id}>{i.name}</Option>
              ))
              }</Select>
        </div> 
          
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            rules={[
              {
                required: true,
                message: "this item is require",
                whitespace: true,
              },
            ]}
          >
            <p>Open : </p>
            <TimePicker
              style={{ width: '100%' }}
              use24Hours
              format={"HH:mm"}
              placeholder={this.state.open_time===""?"last name":this.state.open_time+" (optional)"}
              //defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.open_tChange)}
            />
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            rules={[
              {
                required: true,
                message: "this item is require",
                whitespace: true,
              },
            ]}
          >
            <p>Close : </p>
            <TimePicker
               style={{ width: '100%' }}
              use24Hours
              format={"HH:mm"}
              placeholder={this.state.close_time===""?"last name":this.state.close_time+" (optional)"}
              //defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.close_tCange)}
            />
          </Form.Item>
          <Form.Item
            name="Price"
            onChange={this.onChange}
            rules={[
              {
                required: true,
                message: "Please input cafe address and some necessary description !",
                whitespace: true,
              },
            ]}
          >
            <p>
            <span style={{color:"red"}}>*</span> Price : &nbsp;
                <Tooltip title="How much does each hour of playing in the cafe cost?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </p>
            <Input
               style={{ width: '100%' }}
              name="Price"
              placeholder={this.state.price===""?"last name":this.state.price+" (optional)"}
             // defaultValue="100,000"
              onChange={(this.onChange, this.pricechange)}
            />
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            name="Telephone"
            rules={[
              {
                required: true,
                message: "Please input phone number!",
                whitespace: true,
              },
            ]}
          >
            <p> <span style={{color:"red"}}>*</span> Phone number : &nbsp;</p>
            <Input
              name="Telephone"
              placeholder={this.state.Telephone===""?"last name":this.state.Telephone+" (optional)"}
             // defaultValue="021-00000000"
              onChange={(this.onChange, this.telephoneChange)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
<Gallery />
          </Form.Item>

          <div>
            <Mapir
              className="map"
              center={[this.state.longitude, this.state.latitude]}
              Map={Map}
            >
              <Mapir.Layer
                type="symbol"
                layout={{ "icon-image": "harbor-15" }}
              ></Mapir.Layer>
              <Mapir.Marker
                coordinates={[this.state.longitude, this.state.latitude]}
                anchor="bottom"
              ></Mapir.Marker>
            </Mapir>
          </div>
          </Form>
          </div>
        );
    }
}
export default Cafeedit;