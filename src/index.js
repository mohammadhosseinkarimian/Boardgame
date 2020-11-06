import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Component/homepage';
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import 'antd/dist/antd.css';
import Routes from "./Routes";
import './Style/Login.css'

ReactDOM.render(<Routes />, document.getElementById('root'));
