import {
    Form, Input, Button, Checkbox, Space,
} from 'antd';
import React, { Component } from 'react';
import RegisterForm from '../Signup/RegisterForm';
import Passport from './Passport';

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

      const p = new Passport();
      p.login(values.username, values.password, () => {
          // 登录成功时，跳转页面
          //   this.setState({
          //       isLogin: true,
          //   });
          this.props.history.push('/main');
      });

      fetch('/api/login', {
          method: 'POST',

          // send data as json strings to back-end
          body: JSON.stringify({
              username: values.username,
              password: values.password,
          }),
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then((res) => res.json())
          .then((json) => {
              //   let data = this.state.new_user;
              //   data = json;
              //   this.setState({
              //       new_user: data,
              //   });
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
