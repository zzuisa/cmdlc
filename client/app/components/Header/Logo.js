import { Menu, Input, Button } from 'antd';
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

          <Button type="primary" size="large" >Logo</Button>
      );
  }
}
