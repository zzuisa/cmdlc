import React, { Component } from 'react';
import {
    Form, Input, Result, Checkbox, message, notification, Button, Row, Col, Space,
} from 'antd';
import {
    withRouter,
} from 'react-router-dom';
import $http from '../Util/PageHelper';

class ResetPsdByEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showv: false,
            isMail: false,
            newPsd: false,
            hasSent: false,
            end: false,
            newButton: false,
        };
    }

    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'vaild email address',
            description:
            'Please check your mail box and input the verification code!',
        });
    };

    wrongCAPTCHA = (type) => {
        notification[type]({
            message: 'Wrong CAPTCHA',
            description:
            'Please check your mail box and input the right verification code!',
        });
    };

    noMail= (type) => {
        notification[type]({
            message: 'Email does not exist ',
            description:
            'We can not find your email address, please type the vaild one!',
        });
    };

    toMain = (type) => {
        notification[type]({
            message: 'Password resetting successully',
            description:
            'About to jump to the home page ',
        });
    };

    newPsdset = (type) => {
        notification[type]({
            message: 'Right verification code',
            description:
            'Please set your new password !',
        });
    };

    sendSuccessfully=(type) => {
        notification[type]({
            message: 'New verification code has been sent',
            description:
            'Please check your email !',
        });
    }

    checkCAPTCHA=(number) => {
        if (this.state.verifyCode != number
            && this.state.verifyCode !== undefined
            && !this.state.newPsd
            && number !== undefined) {
            this.wrongCAPTCHA('error');
        }
    }

    onFinish = (values) => {
        console.log('values', values);
        this.setState({
            hasSent: true,
        });
        if (!this.state.isMail) {
            $http({
                url: '/api/findOneUser',
                method: 'post',
                // send data as json strings to back-end
                data: {
                    email: values.email,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    if (res !== undefined) {
                        this.openNotificationWithIcon('success');
                        this.setState({
                            isMail: true,
                            showv: true,
                        });
                        $http({
                            url: '/api/sendMail',
                            method: 'post',
                            // send data as json strings to back-end
                            data: {
                                email: values.email,

                            },
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((data) => {
                                this.setState({
                                    userMail: values.email,
                                    verifyCode: data.data.content.response.verify,
                                    newButton: true,
                                });
                                this.sendSuccessfully;
                                // ;
                            });
                    } else {
                        this.noMail('warning');
                    }
                });
        }
        if (this.state.newButton) {
            $http({
                url: '/api/sendMail',
                method: 'post',
                // send data as json strings to back-end
                data: {
                    email: values.email,

                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((data) => {
                    this.setState({

                        verifyCode: data.data.content.response.verify,
                    });
                    this.sendSuccessfully('success');
                    // ;
                });
        }
        if (this.state.verifyCode == values.verifyCode && this.state.verifyCode !== undefined) {
            this.setState({
                showv: false,
                newPsd: true,
            });
        }

        this.checkCAPTCHA(values.verifyCode);
        if (values.newpassword !== undefined) {
            $http({
                url: '/api/forgetPsd',
                method: 'post',
                // send data as json strings to back-end
                data: {
                    email: this.state.userMail,
                    newPassword: values.newpassword,

                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => {
                    // ;
                    this.toMain('success');
                    setTimeout(() => { this.props.history.push('/'); }, 2000);
                });
        }
    };

      onFinishFailed = (errorInfo) => {

      };

    render=() => {
        let sendButton;

        let buttonText;
        let submit;
        let newPsd;
        let newPsdButton;

        if (!this.state.hasSent) {
            sendButton = <Form.Item>
                <Button type="primary" htmlType="submit">
                    Send verification code
                </Button>
            </Form.Item>;
        } else {
            sendButton = <Form.Item>
                <Button type="primary" htmlType="submit">
                Send verification code again!
                </Button>
            </Form.Item>;
        }
        if (this.state.showv) {
            buttonText = <Form.Item
                label="CAPTCHA"
                name="verifyCode"
                labelAlign='left'
                labelCol={{ span: 24 }}
                rules={[
                    {
                        // required: true,
                        message: 'Please input your Verification Code!',
                    },
                ]}

            >

                <Input.Password style={{ width: 200 }} />

            </Form.Item>;

            submit = <Form.Item

            ><Button type="primary" htmlType="submit" >
          Submit CAPTCHA
                </Button>
            </Form.Item>;
        }

        if (this.state.newPsd) {
            this.newPsdset('success');
            newPsd = <Form.Item
                label="New password"
                name="newpassword"
                labelAlign='left'
                labelCol={{ span: 24 }}
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                ]}

            >

                <Input.Password style={{ width: 200 }} />

            </Form.Item>;

            newPsdButton = <Form.Item

            ><Button type="primary" htmlType="submit" onClick={this.jump}>
    Confirm New Password
                </Button>
            </Form.Item>;
        }
        return (

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
                {/* <Row>
                    <Col span={24}></Col>
                </Row>
                <Row>
                    <Col span={12}></Col>
                    <Col span={12}></Col>
                </Row> */}
                {/* <Row> */}
                <Form.Item
                    label="Email"
                    name="email"
                    labelAlign='left'
                    labelCol={{ span: 24 }}

                    rules={[
                        {
                            required: true,
                            message: 'Please input a vaild Email!',
                            type: 'email',
                        },
                    ]}

                >

                    <Input style={{ width: 200 }}/>

                </Form.Item>

                {sendButton}

                {/* </Row> */}

                {buttonText}
                {submit}
                {newPsd}
                {newPsdButton}
            </Form>

        );
    }
}
export default withRouter(ResetPsdByEmail);
