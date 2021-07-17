import React, { Component } from 'react';
import {
    message,
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Input, Checkbox, Space, Row, Col, Image, Drawer,
    Rate,

    Tooltip,
} from 'antd';

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import $http from '../Util/PageHelper';

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
    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export default class RegisterForm extends Component {
    onFinish = (values) => {
        $http('/api/register', {
            method: 'POST',

            // send data as json strings to back-end
            data: {
                name: values.name,
                password: values.password,
                type: values.identity,
                avatar: null,
                email: values.email,
                create_time: new Date(),
                update_time: null,
                delete_time: null,
                team: values.team, // get input values in 'topic-team' choosing
                channels: [],
            },
        })
            .then((res) => {
                message.success('Registration success!');
                this.props.history.push('/');
            });
    };

    login=() => {
        this.props.history.push('/login');
    }

    render=() => {
        return (
            <Row style={{ marginTop: 150 }}>
                <Col style={{ margin: '0 auto', display: 'inline-block' }} offset={16} span={8}>

                    <Image
                        style={{
                            margin: '0 auto', borderRadius: '10px', textAlign: 'center', display: 'flex',
                        }}
                        src="assets/img/due.png"
                    />
                    <div style={{ float: 'left' }}>
                        <span style={{ fontSize: '2em' }}>Brainstorm </span>
                        <span style={{ fontSize: '2em' }}> CourseMapper</span>

                    </div>
                </Col>
                <Col span={24} style={{ marginTop: 50 }}>
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
                            {/* <Tooltip title="Attention! For resetting password" color='pink'>

                        <Input />
                    </Tooltip> */}

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
                                        } return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="team"
                            label="Topic-Team"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your topic-team!',
                                },
                            ]}
                        >
                            <Select placeholder="Please select your topic-team">
                                <Option value="React">React Group</Option>
                                <Option value="Vue">Vue Group</Option>
                                <Option value="Angular">Angular Group</Option>
                            </Select>
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
                            <Button style={{ float: 'left' }} type="primary" htmlType="submit">
            Submit
                            </Button>
                            <Button style={{ float: 'right' }} type="primary" onClick={this.login}>
            Back to Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        );
    }
}
