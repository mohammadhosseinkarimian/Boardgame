import React from "react";
import moment from "moment";
import CafeMap from "../Map/Map";
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
import Picture from "./pic-upload"
import axios from 'axios';
import "antd/dist/antd.css";
import { QuestionCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
const { RangePicker } = TimePicker;
const { Option } = Select;
const { Dragger } = Upload;
let index = 0;
let base64="";
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
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const uploadButton = (
  <div >
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload picture</div>
  </div>
);

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
class Cafe extends React.Component {
  state = {
    Avatar: "",
    name: "",
    Description: "",
    selected_game:"",
    List_of_board_games: [],
    suggestlist_game:[],
    //items: ["Chess", "tic-tac-toe", "monopoly"],
    Price: 0,
    Open_time: "00:00",
    Close_time: "00:00",
    Telephone: "",
    loggedIn: "",
    msg: "",
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  onFinish = (values) => {};
  onChange = (e) => {
    e.persist();
    console.log(this.state);
    this.setState((a) => {
      return {
        [e.target.name]: e.target.value,
      };
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      base64=base64+ "***"+file.preview;
      console.log(base64.substring(1));
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
   
      });;
    };
  handleChange = ({ fileList }) => {
    //console.log(base64);
    this.setState({ fileList })}

  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  descriptionChange = (e) => {
    this.setState({ Description: e.target.value });
  };
  l_o_bgChange = (e) => {
    var dict = { item: e };
    // this.state.List_of_board_games.push(dict);
    this.setState(
      { List_of_board_games: this.state.List_of_board_games + " " + e },
      () => {
        console.log(this.state.List_of_board_games);
      }
    );
  };
  pricechange = (e) => {
    this.setState({ Price: e.target.value });
    //console.log("changed", e);
    // if (e > 0) {
    //   return Promise.resolve();
    // }
    // return Promise.reject("Price must be greater than zero!");
  };
  open_tChange = (e) => {
    if (e !== null) this.setState({ Open_time: e.format("LT") });
  };
  close_tCange = (e) => {
    if (e !== null) this.setState({ Close_time: e.format("LT") });
  };
  telephoneChange = (e) => {
    this.setState({ Telephone: e.target.value });
  };
  Upload =  async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      base64=file.preview;
      console.log(file.preview);
    }

  };
 
  proxyurl= "http://localhost:8010/proxy";
  onSubmit = (e) => {
     e.preventDefault();
    // e.target.reset();
    const data={
      name:this.state.name,
      description:this.state.Description,
      price:this.state.Price,
      open_time:this.state.Open_time,
      close_time:this.state.Close_time,
      phone_number:this.state.Telephone,
      games:this.state.List_of_board_games,
      gallery:base64.substring(1)
  }

    axios.post(this.proxyurl+'/cafe/create_cafe/',JSON.stringify(data),{headers:{
      'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
      'Accept' : 'application/json',
      'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
  ).then((res)=>{
    console.log(res.data+"reeee")
  })
  .catch((error)=>
    {
      console.log(error.respose+"errrr")
    })
  };

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

  render() {
    const { items } = this.state;
    const previewVisible = this.state.previewVisible;
    const previewImage = this.state.previewImage;
    const fileList = this.state.fileList;
    const previewTitle = this.state.previewTitle;
    return (
      <div className="Cafe_container">
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>{" "}
        <Form
          {...formItemLayout}
          // form={this.form}
          name="register-cafe"
          ref={(el) => (this.myFormRef = el)}
          onFinish={this.onSubmit}
          scrollToFirstError
          onSubmit={this.onSubmit.bind(this)}
        >
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="There was something wrong with the server please try again"?
        "There was something wrong with the server please try again":""}</p> */}
          <Form.Item
            name="name"
            onChange={this.onChange}
            label={<span>Cafe name&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input cafename!",
                whitespace: true,
              },
            ]}
          >
            <Input
              required
              name="name"
              onChange={(this.onChange, this.nameChange)}
            />
          </Form.Item>
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="A cafe with that name already exists."? 
        "A cafe with that name already exists.":""}</p> */}
          <Form.Item
            name="Description"
            label={
              <span>
                Description&nbsp;
                <Tooltip title="Type address and some descriptions about caffe">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please input cafename!",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          >
            <Input.TextArea
              required
              name="Description"
              onChange={(this.onChange, this.descriptionChange)}
            />
          </Form.Item>
           <Form.Item
            label={
              <span>
                Board games&nbsp;
                <Tooltip title="What board games are there in the cafe?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: false,
                message: "Select Board games of caffe",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          >
           <Select
           mode="multiple"
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
              }</Select>
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            label={<span>Open</span>}
            rules={[
              {
                required: true,
                message: "this item is require",
                whitespace: true,
              },
            ]}
          >
            <TimePicker
              style={{ width: 240 }}
              use24Hours
              format={"HH:mm"}
              defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.open_tChange)}
            />
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            label={<span>Close</span>}
            rules={[
              {
                required: true,
                message: "this item is require",
                whitespace: true,
              },
            ]}
          >
            <TimePicker
              style={{ width: 240 }}
              use24Hours
              format={"HH:mm"}
              defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.close_tCange)}
            />
          </Form.Item>
          <Form.Item
            name="Price"
            onChange={this.onChange}
            label={
              <span>
                Price&nbsp;
                <Tooltip title="How much does each hour of playing in the cafe cost?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input
              style={{ width: 240 }}
              name="Price"
              placeholder="100,000"
              onChange={(this.onChange, this.pricechange)}
            />
          </Form.Item>
          <Form.Item
            onChange={this.onChange}
            name="Telephone"
            label={<span>Phone number&nbsp;</span>}
            rules={[
              {
                required: true,
                message: "Please input phone number!",
                whitespace: true,
              },
            ]}
          >
            <Input
              name="Telephone"
              placeholder="021-00000000"
              onChange={(this.onChange, this.telephoneChange)}
              style={{ width: 240 }}
            />
          </Form.Item>
          <Form.Item
            style={{ display: "inline"}}
            className="upload_img"
          >
           {/* <Picture></Picture> */}
             <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={this.state.fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              <div className="upload-button">
                {" "}
                {fileList.length >= 20 ? null : uploadButton}
           <span style={{fontSize:"11px"}}>{"(at most 20)"} </span>  </div>
          <Modal
                        visible={previewVisible}
                        title={previewTitle}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal> </Upload> 
          </Form.Item>
          <Form.Item className="cafe_map">
            <CafeMap />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              class="btn btn-primary"
              onClick={(this.onSubmit)}
              name="submit"
            >
              <span
                class={
                  this.state.loggedIn === "logging in"
                    ? "spinner-border spinner-border-sm"
                    : ""
                }
                role={this.state.loggedIn === "logging in" ? "status" : ""}
                aria-hidden={this.state.loggedIn === "logging in" ? "true" : ""}
              ></span>
              {this.state.loggedIn === "logging in"
                ? "Loading..."
                : "Add Caffe"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Cafe;
