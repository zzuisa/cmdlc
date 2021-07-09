import React, { Component } from 'react';

import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Rate,
    Checkbox,
    Row,
    Col,
    Input,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export default class RegisterForm extends Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);

        fetch('/api/register', {
            method: 'POST',

            // send data as json strings to back-end
            body: JSON.stringify({
                name: values.name,
                password: values.password,
                type: values.identity,
                avatar: null,
                email: values.email,
                create_time: new Date(),
                update_time: null,
                delete_time: null,
                team: [],
                channels: [],
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {

            });
    };

    render=() => {
        return (

            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={this.onFinish}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                }}
            >

                <Form.Item label="Noders Group ">
                    <span className="ant-form-text">xxx System</span>
                </Form.Item>
                {/* <Form.Item
                    name="identity"
                    label="Identity"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please select your Identity!',
                        },
                    ]}
                >

                    <Select placeholder="Please select your major">
                        <Option value="0">Studnent</Option>
                        <Option value="1">Teacher</Option>
                        <Option value="2">Admin</Option>
                    </Select>
                </Form.Item> */}
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name',
                        },
                    ]}
                >
                    <Input placeholder="Please input your name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="major"
                    label="Major"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please select your major!',
                        },
                    ]}
                >
                    <Select placeholder="Please select your major">
                        <Option value="china">Computer Engineering</Option>
                        <Option value="usa">Intelligent Network</Option>
                    </Select>
                </Form.Item>

                {/* select-multiple */}
                {/* <Form.Item
                    name="select-multiple"
                    label="Select[multiple]"
                    rules={[
                        {
                            required: true,
                            message: 'Please select your favourite colors!',
                            type: 'array',
                        },
                    ]}
                >
                    <Select mode="multiple" placeholder="Please select favourite colors">
                        <Option value="red">Red</Option>
                        <Option value="green">Green</Option>
                        <Option value="blue">Blue</Option>
                    </Select>
                </Form.Item> */}

                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Please upload your certificate docuement"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 8,
                        offset: 8,
                    }}
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
                        },
                    ]}

                >
                    <Checkbox>
          I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 8,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
            Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
