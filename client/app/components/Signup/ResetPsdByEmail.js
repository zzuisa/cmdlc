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

            isMail: false,
            newPsd: false,

        };
    }

    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'vaild email address',
            description:
            'Please check your mail box and input theverification code!',
        });
    };

    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Password resetting successully',
            description:
            'About to jump to the home page ',
        });
    };

    onFinish = (values) => {
        console.log('Success:', values);
        // message.loading({ content: 'Loading...' });
        // setTimeout(() => {
        //     message.success({ content: 'Loaded!', duration: 2 });
        // }, 1000);
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
                                // console.log(this.state.verifyCode);
                            });
                    } else {
                        alert("Your email isn't registrated, please try again");
                    }
                });
        }

        if (this.state.verifyCode == values.verifyCode && this.state.verifyCode !== undefined) {
            this.setState({
                newPsd: true,
            });
        } else if (this.state.verifyCode != values.verifyCode && this.state.verifyCode !== undefined) {
            alert('Wroing Verification Code');
        }

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
                    this.openNotificationWithIcon('success');
                    setTimeout(() => { this.props.history.push('/'); }, 2000);
                });
            console.log(values.newpassword);
        }
    };

      onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
      };

    render=() => {
        let buttonText;
        let submit;
        let newPsd;
        let newPsdButton;
        if (this.state.isMail) {
            buttonText = <Row>
                <Form.Item
                    label="VerifyCode"
                    name="verifyCode"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Verification Code!',
                        },
                    ]}

                >

                    <Input />

                </Form.Item>
            </Row>;
            submit = <Row>
                <Form.Item

                ><Button type="primary" htmlType="submit">
          Submit
                    </Button>
                </Form.Item>
            </Row>;
        }

        if (this.state.newPsd) {
            newPsd = <Row>
                <Form.Item
                    label="New password"
                    name="newpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                    ]}

                >

                    <Row>
                        <Input />
                    </Row>

                </Form.Item>
            </Row>;
            newPsdButton = <Row>
                <Form.Item

                ><Button type="primary" htmlType="submit">
  Submit
                    </Button>
                </Form.Item>
            </Row>;
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
                <Row>
                    <Col span={24}></Col>
                </Row>
                <Row>
                    <Col span={12}></Col>
                    <Col span={12}></Col>
                </Row>
                <Row>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >

                        <Row>
                            <Input />
                        </Row>

                    </Form.Item>
                    <Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                      Check  mailaddress?
                            </Button>
                        </Form.Item>
                    </Row>

                </Row>

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
