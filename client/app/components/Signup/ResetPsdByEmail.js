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

    sendCAPTCHA=() => {
        $http({
            url: '/api/sendMail',
            method: 'post',
            // send data as json strings to back-end
            data: {
                email: this.state.userMail,

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
                // console.log(this.state.verifyCode);
            });
    }

    checkCAPTCHA=(number) => {
        console.log(number + this.state.verifyCode + this.state.newPsd);
        if (this.state.verifyCode != number && this.state.verifyCode !== undefined && !this.state.newPsd && number !== undefined) {
            this.wrongCAPTCHA('error');
        }
    }

    onFinish = (values) => {
        console.log('Success:', values);
        // message.loading({ content: 'Loading...' });
        // setTimeout(() => {
        //     message.success({ content: 'Loaded!', duration: 2 });
        // }, 1000);
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
                    // cookie.save('userinfo', res.data.content.doc);
                    // cookie.save('userToken', res.data.content.token);

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

                                });
                                this.sendSuccessfully;
                                // console.log(this.state.verifyCode);
                            });
                    } else {
                        this.noMail('warning');
                    }
                });
        }

        if (this.state.verifyCode == values.verifyCode && this.state.verifyCode !== undefined) {
            this.setState({
                showv: false,
                newPsd: true,
            });
        }

        this.checkCAPTCHA(values.verifyCode);
        // else if (this.state.verifyCode != values.verifyCode && this.state.verifyCode !== undefined) {
        //     this.wrongCAPTCHA('error');
        // }

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
                    // console.log(res);
                    this.toMain('success');
                    setTimeout(() => { this.props.history.push('/'); }, 2000);
                });
            console.log(values.newpassword);
        }
    };

      onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
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
                <Button type="primary" htmlType="submit" onClick={this.sendCAPTCHA}>
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

        //     <Result
        //         status="success"
        //         title="Successfully Purchased Cloud Server ECS!"
        //         subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        //         extra={[
        //             <Button type="primary" key="console" onClick={this.sendEvent}>
        // Go Console
        //             </Button>,
        //             <Button key="buy">Buy Again</Button>,
        //         ]}
        //     />

        );
    }
}
export default withRouter(ResetPsdByEmail);
