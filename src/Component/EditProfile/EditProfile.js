import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import FormItem from 'antd/lib/form/FormItem';
import {
    Form,
    Input,
    Tooltip,
    Select,
    Tabs,
    AutoComplete,
    Button,
    DatePicker
} from "antd";
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

const { TabPane } = Tabs;

class EditProfile extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        newPassword: "",
        confirm_password: "",
        year:""
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
    onyearChange=(date, dateString)=> {
         this.year=dateString;
        console.log(date, dateString);
      }



    onSaveGeneral = (e) => {
        const changeddata = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            year: this.year,
            email: this.state.email,
            password: "",
            newPassword:"", 
             
        };
        const changeddata_json = JSON.stringify(changeddata);
        console.log(changeddata_json);
    };

    onSavePassword = (e) => {
        const changeddata = {
            firstname: "",
            lastname: "",
            year: "",
            email: "",
            password: this.state.password,
            newPassword:this.state.newPassword,  
        };
        const changeddata_json = JSON.stringify(changeddata);
        console.log(changeddata_json);
    };

    render() {
        return (
            <div className="EditProfile_container">
               
                <Form
                    {...formItemLayout}
                    name="Edit"
                    onFinish={this.onSubmit}
                    scrollToFirstError
                >


                    <Tabs defaultActiveKey="1">
                        <TabPane tab="General" key="1">
                        <Form.Item
                        name="firstname"
                        label="FirstName"
                        rules={[
                            {
                                required: false,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Input name="firstname" placeholder="(optional)" onChange={this.onChange} />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="LastName"
                        rules={[
                            {
                                required: false,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Input name="lastname" placeholder="(optional)" onChange={this.onChange} />
                    </Form.Item>


                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input name="email" onChange={this.onChange} />
                    </Form.Item>



                    <Form.Item
                        name="year"
                        label="Birth Year"
                        rules={[
                            {
                                type:"date" ,
                                message: "The input is not valid year!",
                            },
                            {
                                required: false,
                            },
                        ]}
                    >
                         <DatePicker name="year" onChange={this.onyearChange} picker="year" />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.onSaveGeneral}>
                            Save
                        </Button>
                    </Form.Item>

                    </TabPane>



                    <TabPane tab="Password" key="2">
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your current password!",
                            },
                        ]}
                    >
                        <Input.Password name="password" onChange={this.onChange} />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        label="NewPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password name="newPassword" onChange={this.onChange} />
                    </Form.Item>


                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["newPassword"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        "The two passwords that you entered do not match!"
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={this.onSavePassword}>
                            Save
                        </Button>
                    </Form.Item>
                    </TabPane>
                </Tabs>
                </Form>
            </div>
        );
    }
}
export default EditProfile;