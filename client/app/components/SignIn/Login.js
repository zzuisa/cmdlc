import {
    Form, Input, Button, Checkbox, Space,
} from 'antd';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import RegisterForm from '../Signup/RegisterForm';
import $http from '../Util/PageHelper';

export default class Login extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            // new_user: null,
            isLogin: false,
        };
    }

  onFinish = (values) => {
      console.log('Success:', values);
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
              console.log('data', res.data);
              cookie.save('user', res.data.token);

              if (res.data) {
                  this.props.history.push('/');
              } else {
                  alert('login fails');
              }
          });
  };

  onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };

  onReset = () => {
      this.formRef.current.resetFields();
  };

  render=() => {
      return (
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
              //   layout='vertical'

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
          </Form>

      //   <RegisterForm/>
      );
  }
}
