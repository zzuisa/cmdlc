import {
    Form, Input, Button, Checkbox, Space,
} from 'antd';
import React, { Component } from 'react';
import RegisterForm from '../Signup/RegisterForm';

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
          .then((res) => { console.log('res', res); return res.json(); })
          .then((data) => {
              console.log('data', data);
              if (data) {
                  this.props.history.push('/main');
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

  register=() => {
      this.props.history.push('/register');
  }

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
                  <Button type="link" htmlType="button" onClick={this.register}>
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

      //   <RegisterForm/>
      );
  }
}
