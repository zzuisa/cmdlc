import {
    Menu, Input, Button, notification, Avatar, Badge,
} from 'antd';
import {
    MessageOutlined, SettingOutlined, DownloadOutlined, LogoutOutlined, UserOutlined, FormOutlined, ProfileOutlined,
    createFromIconfontCN,
} from '@ant-design/icons';
import React, { Component } from 'react';
import {
    NavLink,
} from 'react-router-dom';
// eslint-disable-next-line import/named
import HorizontalLoginForm from '../SignIn/Login';

const { UserSettingRoute } = require('../../router/routes');

const { SubMenu } = Menu;
const { Search } = Input;
// const suffix = (
//     <AudioOutlined
//         style={{
//             fontSize: 16,
//             color: '#1890ff',
//         }}
//     />
// );

const array = [MessageOutlined, DownloadOutlined];

// notation for logout
const openNotification = (placement) => {
    notification.info({
        message: 'Logout',
        description:
        'Now you have logged out of your account',
        placement,
    });
};
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

export default class Nav extends React.Component {
    state = {
        current: 'SubMenu',
        status: 'true',

    };

  handleClick = (e) => {
      console.log('click ', e);
      this.setState({ current: e.key });
  };

  //   onSearch = (value) => console.log(value);

  onResponse=() => {
      this.setState({ status: !this.state.status });

      if (this.state.status == 'true') {
          openNotificationWithIcon('success');
          console.log('改变为绿');
          console.log(`call res${this.state.status}`);
      } else if (this.state.status == 'false') {
          openNotificationWithIcon('warning');
          console.log('改变为红');
          console.log(`call res${this.state.status}`);
      }
  }

  login=() => {
      this.setState({ status: !this.state.isLoggedIn });
      console.log(`${this.state.isLoggedIn}  login`);
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

      if (this.props.isLoggedIn == 'false') {
          return (
              <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ float: 'right', zIndex: 99 }}>

                  <Menu.Item key="login" onClick={() => { this.login(); }}><HorizontalLoginForm/></Menu.Item>

                  {/* <Menu.Item key="search">
          <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={this.onSearch}
          />
      </Menu.Item> */}

              </Menu>
          );
      }
      return (

          <Menu theme="dark" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" style={{ float: 'right', zIndex: 99 }}>

              <Menu.Item key="avatar">
                  <Badge count={1}>
                      <Avatar shape="square" icon={<UserOutlined />} />
                  </Badge>
              </Menu.Item>
              <Menu.Item key="status">
                  {button}
                  <Button type="primary" onClick={() => { this.onResponse(); }}>{status}</Button>
              </Menu.Item>
              {/* <SubMenu title="SubMenu" onTitleClick={this.onResponse('伟大新')}></SubMenu> */}
              <Menu.Item key="app" icon={<SettingOutlined />}>
        Navigation Two
              </Menu.Item>

              <SubMenu key="SubMenu" style={{ float: 'right' }} icon={ <UserOutlined />} title="User Setting" >
                  <Menu.ItemGroup title="Sytsem Setting">
                      <Menu.Item key="setting:1">System Setting1</Menu.Item>
                      <Menu.Item key="setting:2">System Setting2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Profile">
                      <Menu.Item key="setting:3" icon={<ProfileOutlined />}>View Profile</Menu.Item>
                      <Menu.Item key="setting:4" icon={<FormOutlined />}>Edit Profile</Menu.Item>
                      <Menu.Item key="setting:5" icon={<LogoutOutlined/>} onClick={() => openNotification('topLRight')}>Logout</Menu.Item>
                  </Menu.ItemGroup>
              </SubMenu>

              {/* <Menu.Item key="search">
                <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    suffix={suffix}
                    onSearch={this.onSearch}
                />
            </Menu.Item> */}

          </Menu>

      );
  }
}
