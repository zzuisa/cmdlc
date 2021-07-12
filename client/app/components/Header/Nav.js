import {
    Menu, Input, Button, notification, Avatar, Badge,
    Popconfirm, message,
} from 'antd';
import {
    withRouter,
    NavLink,
} from 'react-router-dom';
import {
    MessageOutlined, SettingOutlined, DownloadOutlined, LogoutOutlined, UserOutlined, FormOutlined, ProfileOutlined,
    createFromIconfontCN,
} from '@ant-design/icons';
import React, { Component } from 'react';

import cookie from 'react-cookies';

const { UserSettingRoute } = require('../../router/routes');

const { SubMenu } = Menu;

const array = [MessageOutlined, DownloadOutlined];

// notation with icons
const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Notification Title',
        description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
};

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2641472_epyvupb8bfp.js',
});

class Nav extends React.Component {
    state = {
        current: 'SubMenu',
        status: 'true',
        userinfo: cookie.load('userinfo'),

    };

  handleClick = (e) => {
      this.setState({ current: e.key });
  };

  //   onSearch = (value) =>

  onResponse=() => {
      this.setState({ status: !this.state.status });

      if (this.state.status == 'true') {
          openNotificationWithIcon('success');
      } else if (this.state.status == 'false') {
          openNotificationWithIcon('warning');
      }
  }

  confirm=(e) => {
      console.log(e);
      message.success('Please update your new avatar');
  }

  cancel=(e) => {
      console.log(e);
      message.error('You cancel change your avatar');
  }

  toLogin = () => {
      if (this.state.userinfo == null) {
          this.props.history.push('/login');
      }
  };

  logout=() => {
      notification.info({
          message: 'Logout',
          description:
                'Now you have logged out of your account',

      });

      cookie.remove('userInfo');

      alert('Wait 2 seconds to jump');
      setTimeout(() => { this.props.history.push('/login'); }, 2000);
  }

  render() {
      const { current } = this.state;
      const isOnline = this.state.status;
      let button;
      let status = 'Online';
      if (isOnline) {
          button = <Button key="status1"><IconFont type='icon-lvdian' /></Button>;
          status = 'Online';
      } else {
          button = <Button key="status2"><IconFont type='icon-lvdian1'/></Button>;
          status = 'Offline';
      }

      let logoutItem;

      if (this.state.userinfo !== undefined) {
          logoutItem = <Menu.Item key="setting:5" icon={<LogoutOutlined/>} onClick={this.logout}>Logout</Menu.Item>;
      }

      return (

          <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ float: 'right', zIndex: 99 }}>

              {/* status button!!! */}
              {/* <Menu.Item key="status">
                  {button}
                  <Button type="primary" onClick={() => { this.onResponse(); }}>{status}</Button>
              </Menu.Item> */}
              <Menu.Item key="welcome" onClick={this.toLogin} >

                  { this.state.userinfo === undefined ? 'Please login ' : this.state.userinfo.name}
              </Menu.Item>
              {/* <Menu.Item key="avatar">

                   set unseen message counts here
                  <Badge count={1}>
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </Badge>

              </Menu.Item> */}
              <SubMenu key="SubMenu" style={{ float: 'right' }} icon={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} title="User Setting" >
                  {/* <Menu.ItemGroup title="Sytsem Setting">
                      <Menu.Item key="setting:1">System Setting1</Menu.Item>
                      <Menu.Item key="setting:2">System Setting2</Menu.Item>
                  </Menu.ItemGroup> */}
                  <Menu.ItemGroup title="Profile">
                      {/* icon={<ProfileOutlined />} */}
                      <Menu.Item key="setting:3" icon={<ProfileOutlined />}><NavLink to='/userSetting/profile'>View Profile</NavLink></Menu.Item>
                      <Menu.Item key="setting:4" icon={<FormOutlined />}>Edit Profile</Menu.Item>
                      {logoutItem}
                  </Menu.ItemGroup>
              </SubMenu>

          </Menu>

      );
  }
}

export default withRouter(Nav);
