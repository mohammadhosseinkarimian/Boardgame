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
class LogPlay extends React.Component {
    state={
        id:"",
        players:[],
        game:"",
        date:"",
        place:""

    }
}
export default LogPlay;
