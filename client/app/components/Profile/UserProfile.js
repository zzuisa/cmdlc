import React, { useState } from 'react';
import {

    Descriptions, Badge, Layout, Menu, Button, Row, Col, Input, Space, notification, Form, Popover,
} from 'antd';

import cookie from 'react-cookies';
import EditOutlined from '@ant-design/icons';
import MainMenu from '../../router/menus';
import $http from '../Util/PageHelper';

const { Header, Content, Footer } = Layout;

const openNotificationWithIcon = (type) => {
    if (type == 'success') {
        notification[type]({
            message: 'Password reset successully',
            description:
            'Your sumbit has been processed.Please relogin after 2 seconds',
        });
    } else {
        notification[type]({
            message: 'Wrong password',
            description:
            'Please input the right original password',
        });
    }
};
export default class UserProfile extends React.Component {
    state = {

        userinfo: cookie.load('userinfo'),
        isEdited: false,
        changepsd: false,
        psdChangeTitle: 'Old password',
    };

    // formRef = React.createRef();

    edit=() => {
        this.setState({
            isEdited: true,
        });
    }

    // submitButton=(e) => {
    //     openNotificationWithIcon('success');
    //     console.log();
    //     setTimeout(() => { this.props.history.push('/login'); }, 1000);
    // }

    // change password
    psdChange=(values) => {
        if (values.oldpsd === this.state.userinfo.password && !this.state.changepsd) {
            openNotificationWithIcon('success');

            this.setState({
                changepsd: true,
                psdChangeTitle: 'New password',
            });
        } else if (values.oldpsd != this.state.userinfo.password && !this.state.changepsd) {
            openNotificationWithIcon('error');
        } else if (this.state.changepsd && values.newpsd !== undefined) {
            console.log('执行后台');
            $http({
                url: '/api/modifyPsd',
                method: 'post',
                // send data as json strings to back-end
                data: {
                    newpsd: values.newpsd,
                    currentUser: this.state.userinfo,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    // cookie.save('userinfo', res.data.content.doc);
                    // cookie.save('userToken', res.data.content.token);
                    // this.props.history.push('/');
                    console.log(res);
                    openNotificationWithIcon('success');
                    setTimeout(() => { this.props.history.push('/login'); }, 2000);
                });
        }
    };

    // modify profile
    onFinish = (values) => {
        console.log(`profile提交${values}`);
        if (values.profileName === undefined) {
            values.profileName = this.state.userinfo.name;
        }
        if (values.profileEmail === undefined) {
            values.profileEmail = this.state.userinfo.email;
        }
        $http({
            url: '/api/modifyProfile',
            method: 'post',
            // send data as json strings to back-end
            data: {
                newName: values.profileName,
                newEmail: values.profileEmail,
                currentUser: this.state.userinfo,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                // console.log(`更新后：${res.data.content.doc}`);

                cookie.save('userinfo', res.data.content.doc);
                cookie.save('userToken', res.data.content.token);

                openNotificationWithIcon('success');
                this.setState({
                    userinfo: cookie.load('userinfo'),
                });
                setTimeout(() => { this.props.history.push('/'); }, 2000);
            });
        console.log(values);
    };

    // eslint-disable-next-line class-methods-use-this
    render() {
        let Inp = [];
        let submitButton = <Space size='large' align="center">
            <Button type="primary" icon={<EditOutlined />} onClick={this.edit}>
Edit your userinfo
            </Button>
        </Space>;
        let judge;

        if (this.state.changepsd) {
            judge = <Form.Item name="newpsd"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password placeholder="Your new password"></Input.Password>
            </Form.Item>;
        } else {
            judge = <Form.Item name="oldpsd" rules={[{ required: true, message: 'Please input your current password!' }]}><Input.Password placeholder="Your original password"></Input.Password></Form.Item>;
        }
        if (this.state.isEdited) {
            // console.log(this.state.isEdited);
            // name change
            Inp[0] = <Form.Item
                name="profileName"
                wrapperCol={{ span: 24 }}

            >
                <Input defaultValue={this.state.userinfo.name} />
            </Form.Item>;
            // email change
            Inp[1] = <Space align="center">
                <Form.Item
                    name="profileEmail"
                    wrapperCol={{ span: 24 }}
                >
                    <Input defaultValue={this.state.userinfo.email} />
                </Form.Item>
            </Space>;
            // password change
            Inp[2] = <Popover
                content={
                    <Form
                        name="basic"

                        onFinish={this.psdChange}>

                        {judge}

                        <Form.Item >
                            <Button type="primary" htmlType="submit" >
                            sumbit
                            </Button>

                        </Form.Item>
                    </Form>
                }
                title={this.state.psdChangeTitle}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Button type="primary">Change password</Button>
            </Popover>;
            // Inp[2] = <Input defaultValue={this.state.userinfo.password} />;

            // Inp[4] = <Input >Click and change your password</Input>;
            // submitButton = <Button type="primary" icon={<EditOutlined />} onClick={this.submitButton}>

            // Submit your changes
            // </Button>;
            submitButton = <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 8,
                }}
            >
                <Space>
                    <Button type="primary" onClick={() => {
                        this.setState({
                            isEdited: false,
                        });
                    }}>
                    Go back
                    </Button>

                    <Button type="primary" htmlType="submit" onClick={this.submit}>
                    Submit your changes
                    </Button>

                </Space>

            </Form.Item>;
        } else {
            Inp[0] = this.state.userinfo === undefined ? '' : this.state.userinfo.name;
            Inp[1] = this.state.userinfo === undefined ? '' : this.state.userinfo.email;
        }

        return (
            <MainMenu>

                <Form

                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}

                >

                    <Descriptions title="User Info" bordered>

                        <Descriptions.Item label="Name">

                            {Inp[0]}
                        </Descriptions.Item>

                        <Descriptions.Item label="Email">{Inp[1]}</Descriptions.Item>
                        <Descriptions.Item label="Account Creation Time" span={2}>
                            { this.state.userinfo === undefined ? '' : this.state.userinfo.create_time}
                        </Descriptions.Item>
                        <Descriptions.Item label="Password Status" span={3}>
                            <Space align="center">
                                <Badge status="processing" color= 'green' text="Verified" />
                                {Inp[2]}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Channels">{ this.state.userinfo === undefined ? '' : this.state.userinfo.channels}</Descriptions.Item>
                        <Descriptions.Item label="Current tasks">TaskOne</Descriptions.Item>

                    </Descriptions>
                    <Row>
                        <Col span={8} offset={8}></Col>
                        <Col span={8} offset={16}>

                            {submitButton}

                        </Col>
                    </Row>

                </Form>

            </MainMenu>
        );
    }
}
