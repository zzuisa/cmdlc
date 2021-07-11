import { Menu, Input, Button } from 'antd';
import {
    MailOutlined, AppstoreOutlined, SettingOutlined, AudioOutlined,
} from '@ant-design/icons';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      this.setState({ current: e.key });
  };

  onSearch = (value) => {

  }

  render() {
      const { current } = this.state;
      return (
          <Link to="/"> <Button type="primary" size="large" >Logo</Button></Link>

      );
  }
}
