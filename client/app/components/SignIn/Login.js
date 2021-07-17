import {
    Form, Input, Button, Checkbox, Space, Row, Col, Image, Drawer,
} from 'antd';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import { NavLink } from 'react-router-dom';
import ResetPsdByEmail from '../Signup/ResetPsdByEmail';
import $http from '../Util/PageHelper';

export default class Login extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {

            isLogin: false,
            // page change states
            visible: false,
            placement: 'right',
        };
    }

  onFinish = (values) => {
      $http({
          url: '/api/login',
          method: 'post',
          // send data as json strings to back-end
          data: {
              username: values.username,
              password: values.password,

          },
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then((res) => {
              cookie.save('userinfo', res.data.content.doc);
              cookie.save('userToken', res.data.content.token);
              console.log(cookie.load('userinfo')); //check userinfo
              this.props.history.push('/');
          });
  };

  onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };

  onReset = () => {
      this.formRef.current.resetFields();
  };

  register=() => {
      this.props.history.push('/register');
  }

  onClose = () => {
      this.setState({
          visible: false,
      });
  };

  forgetPsd=() => {
      // this.props.history.push('/forgetPassword');
      this.setState({
          visible: true,
      });
  }

  render=() => {
      return (
          <>
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
                          ref={this.formRef}
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
                          onFinishFailed={this.onFinishFailed}

                      >

                          <Form.Item
                              label="Username"
                              name="username"
                              rules={[
                                  {
                                      required: true,
                                      message: 'Please input your username!',
                                  },
                              ]}
                          >
                              <Input />
                          </Form.Item>

                          <Form.Item
                              label="Password"
                              name="password"
                              wrapperCol={{
                                  offset: 0,
                                  span: 8,
                              }}
                              rules={[
                                  {
                                      required: true,
                                      message: 'Please input your password!',
                                  },
                              ]}
                          >
                              <Input.Password />
                          </Form.Item>

                          <Form.Item
                              name="remember"
                              valuePropName="checked"
                              wrapperCol={{
                                  offset: 8,
                                  span: 8,
                              }}
                          >
                              <Checkbox>Remember me</Checkbox>
                              <Button type="link" htmlType="button" onClick={this.forgetPsd}>
                                  {/* <NavLink to="/forgetPassword">Forget password?</NavLink> */}
                              Forget password?

                              </Button>
                          </Form.Item>

                          <Form.Item
                              wrapperCol={{
                                  offset: 8,
                                  span: 8,
                              }}
                          >
                              <Space>
                                  <Button type="primary" htmlType="submit" onClick={this.submit}>
          Submit
                                  </Button>
                                  <Button htmlType="button" onClick={this.onReset}>
          Reset
                                  </Button>
                              </Space>

                          </Form.Item>
                          <Form.Item
                              wrapperCol={{
                                  offset: 8,
                                  span: 8,
                              }}
                          ><Button type="link" htmlType="button" onClick={this.register}>
              No account? Here register
                              </Button></Form.Item>

                      </Form>

                  </Col>

                  <Col></Col>
              </Row>
              <Drawer
                  title="Password reset"
                  placement={this.state.placement}
                  closable={false}
                  onClose={this.onClose}
                  visible={this.state.visible}
                  key={this.state.placement}
                  width='300'
                  closable='true'
              >

                  <ResetPsdByEmail/>
              </Drawer>

          </>
      );
  }
}
