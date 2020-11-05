import React from 'react';
import antd from "antd";
import {
  Form,
  Input,
  Tooltip,
  Select,
  AutoComplete,
  Button,
  Mentions,
  DatePicker, 
  Checkbox, 
  Space, 
  TimePicker,
  InputNumber
} from "antd";
import './App.css';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';
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
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const format = 'HH:mm';
const { Option } = Mentions;




class AddPlay extends React.Component {
  state={
    date:"",
    duration:"",
    times:"",
    playmates:"",
    incoplete:""
  }


  onChangedate(date, dateString) {
    console.log(date, dateString);
  }
  onChangenumber(value) {
    console.log('changed', value);
  }

  onChangehour(value) {
    console.log('changed', value);
  }
  onChangeminute(value) {
    console.log('changed', value);
  }

  onChangeMention(value) {
    console.log('Change:', value);
  }

  onSelectMention(option) {
    console.log('select', option);
  }
  
   onChangeincomplete(e) {
    console.log(`checked = ${e.target.checked}`);
   
  }

  onSave(e){
    console.log("save");
  }
  render() {
    return (
      <div className="playLog_container">
        <Form   {...formItemLayout}>
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
            <DatePicker name="date" onChange={this.onyearChangedate} picker="date" />
          </Form.Item>



          <Form.Item label="How many times did you play?">
            <div className="site-input-number-wrapper">
              <InputNumber size="large" min={0} max={100000} defaultValue={0} onChange={this.onChangenumber} />
            </div>
          </Form.Item>



          <Form.Item label="How long did you play?">
            <InputNumber placeholder="hh" size="large" min={0} max={24} onChange={this.onChangehour} />
            <InputNumber placeholder="mm" size="large" min={0} max={60} onChange={this.onChangeminute} />
          </Form.Item>


          <Form.Item label="Who played?">
            <Mentions
              style={{ width: '100%' }}
              onChange={this.onChangeMention}
              onSelect={this.onSelectMention}
              defaultValue="@not a user"
            >
            </Mentions>
          </Form.Item>

          <Form.Item >
          <Checkbox onChange={this.onChangeincomplete}>Game incomplete?</Checkbox>
          </Form.Item>

          <Form.Item >
          <Button type="primary" shape="round" onClick={this.onSave} >Save</Button>
          </Form.Item>
        </Form>
      </div>

    );
  }


}

export default AddPlay;

