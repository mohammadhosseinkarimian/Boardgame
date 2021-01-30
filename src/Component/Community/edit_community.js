import React from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
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
  Modal,
  Switch
} from "antd";
import axios from 'axios';
import "antd/dist/antd.css";
import { QuestionCircleOutlined, CheckCircleOutlined,DeleteFilled,CheckCircleFilled} from "@ant-design/icons";
const { RangePicker } = TimePicker;
const { Option } = Select;
const { Dragger } = Upload;
let index = 0;
let base64="";
//const mapdetail={CafeMap}
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
    id:"",
    image: "",
      name: "",
      img:"",
      description: "",
      owner:"",
      members: [],
      msg: "",
      memberList: [],
      necessary_inputs:"",
      suggestlist_user: [],
      lock:"",
    done:"",
    edit:"",


  };
  onFinish = (values) => {
  //  console.log("Received values of form: ", values);
};
onChange = (e) => {
    e.persist();
   // console.log(e.target.value);
   // console.log(e.target.name);
    this.setState(() => {
        return {
            [e.target.name]: e.target.value,
        };
    });
   // console.log(this.state);
};
proxyurl= "http://gameboard.pythonanywhere.com";
Upload=async(e)=>{
  const file=e.target.files[0];
 const base64= await this.Convert(file)
 this.setState({image:base64});
 console.log(this.state.image)
 this.setState({edit:"true"})
}
Convert=(f)=>{
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(f);
    fileReader.onload=()=>{
      resolve(fileReader.result);
    };
    fileReader.onerror=(err)=>{
      reject(err);
    };
  }) ;
}

getInfo=(e)=>
{
    
    if(this.state.done==="")
    {
let communityid=localStorage.getItem("communityid")    
    axios.get(this.proxyurl+'/community/edit_community/'+communityid,{headers:{
        'Content-Type' : 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
).then((res)=>{  
    console.log(res.data)
    this.setState({id:res.data.id});
    this.setState({name:res.data.name});
    this.setState({description:res.data.description});
    this.setState({members:res.data.members});
    this.setState({image:res.data.image.base64});
    this.setState({lock:res.data.lock});
    this.state.members.map(m=>this.state.memberList.push(m.username) )
    console.log(this.state.memberList)
    console.log(this.state.lock)

this.setState({done:"yes"});
})
.catch((error)=>
{

        } 
        )
    
    }

}
handleChange = (value) => {
  axios.get(this.proxyurl + "/game/search_user/username/?search=" + value)
    .then(res => {
      const tmp = res.data.results;
      console.log(tmp)
      this.setState(prevState => {
        return { suggestlist_user: tmp }
      })
    })
}

onSelectuser = (value) => {
  this.state.members=[]
  var dict =[]
  value.forEach(v=> this.state.members.push({ "username": v}))
  this.setState({ selected_user: value }, () => {
    console.log(this.state.selected_user, 'dealersOverallTotal1')
  })
  console.log(this.state.members)
  this.setState({edit:"true"});
}
nameChange=e=>{
  this.setState({name:e.target.value});
  this.setState({edit:"true"});
  //console.log(this.state.name);
};
descChange=e=>{
  this.setState({description:e.target.value});
  this.setState({edit:"true"});
  //console.log(this.state.description);
};
onChangelock(checked) {
  //  console.log(`switch to ${checked}`);
  this.setState(prevState =>{
    return {lock: checked}
  })
  this.setState({edit:"true"});}
onSaveGeneral = (e) => {
  if((this.state.edit==="true"))
  {
      e.preventDefault();

  const data={
      id:this.state.id,
      name:this.state.name,
      description:this.state.description,
      image:this.state.image,
      lock:this.state.lock,
      owner:localStorage.getItem('id'),
      members:this.state.members,
      
  }
  console.log(data)
  axios.put(this.proxyurl+'/community/edit_community/'+this.state.id+ '/',JSON.stringify(data),{headers:{
      'Content-Type' : 'application/json;charset=utf-8',
      'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
  }}
).then((res)=>{  
  this.setState({edit:""});
   this.setState({msg:"done"});
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
           <Form.Item>
              <img src={this.state.image===''?'':this.state.image} style={{float: 'left' , marginBottom:'5%'}}height="50px" ></img>
       
        <input type="file" onChange={this.Upload}  style={{display: 'none'}}
                            ref={fileInput=>this.fileInput=fileInput}></input>
                            <Button  className="btn btn-primary" onClick={()=>this.fileInput.click()}
                            style={{float: 'left'}}>Choose image</Button>
                            
                            </Form.Item>
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
              placeholder={this.state.name===""?"Community name":this.state.name}
              onChange={(this.nameChange)}
            />
          </Form.Item>
          
          <Form.Item
            name="Description"
            rules={[
              {
                required: true,
                message: "Please input some necessary description about Community!",
                whitespace: true,
              },
            ]}
          >  <p> <span style={{color:"red"}}>*</span>
          Description :&nbsp;
          <Tooltip title="Type some necessary description about Community">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
            <Input.TextArea
              required
              name="description"
              placeholder={this.state.description===""?"description":this.state.description}
              onChange={this.descChange}
            
            />
            </Form.Item>
            <Form.Item>
                <p>
          Members :&nbsp;
          <Tooltip title="Users in your community">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="users"
              defaultValue={this.state.memberList}
              filterOption={false}
              //onChange={this.onSelectuser}
              onSearch={this.handleChange}
              onChange={this.onSelectuser}
            >
              {
                this.state.suggestlist_user.map(d => (
                  <Option key={d.username}>{d.username}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item>
              <p>Set community private:</p>
          <Switch defaultChecked={!this.state.lock} onChange={this.onChangelock} />
          </Form.Item>

          <div>
            <Button
             className="btn btn-primary" style={{width: '100%'}}
              onClick={this.onSaveGeneral} 
              name="submit"
            >
              <span
                class={
                  this.state.necessary_inputs === "Ok"
                    ? "spinner-border spinner-border-sm"
                    : "all"
                }
                role={this.state.necessary_inputs === "Ok"
                ? "spinner-border spinner-border-sm"
                : "all"}
                aria-hidden={this.state.necessary_inputs === "Ok"
                ? "spinner-border spinner-border-sm"
                : "all"}
              ></span>
              {this.state.msg === "done"
                ? "ََEdited"
                : "Edit Community"}
            </Button>
          </div>
          </Form>
          </div>
        );
    }
}
export default Cafeedit;