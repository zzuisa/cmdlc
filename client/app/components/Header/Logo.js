import { Menu, Input } from 'antd';
import {
    MailOutlined, AppstoreOutlined, SettingOutlined, AudioOutlined,
} from '@ant-design/icons';
import React, { Component } from 'react';

const { SubMenu } = Menu;
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

export default class Logo extends React.Component {
  state = {
      current: 'mail',
  };

  handleClick = (e) => {
      console.log('click ', e);
      this.setState({ current: e.key });
  };

  onSearch = (value) => console.log(value);

  render() {
      const { current } = this.state;
      return (

          <Menu theme="light" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ float: 'left' }}>

              <Menu.Item key="mail" >
                  <a href="#"><img src="assets/img/logo.PNG" alt="" /></a>
              </Menu.Item>

          </Menu>
      );
  }
}
