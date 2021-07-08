import React from 'react';
import {
    NavLink, Link, withRouter, useLocation,
} from 'react-router-dom';
import './menus.css';
import cookie from 'react-cookies';

import {
    Layout, Menu, Button,
} from 'antd';
import {
    UploadOutlined, UserOutlined, VideoCameraOutlined, MailOutlined, AppstoreOutlined,
} from '@ant-design/icons';
import Nav from '../components/Header/Nav';
import Logo from '../components/Header/Logo';

const { teamRoute, topicRoute } = require('./routes');

const { SubMenu } = Menu;

const {
    Header, Content, Footer, Sider,
} = Layout;

const selectedStyle = {
    backgroundColor: 'white',
    color: 'slategray',
};

function getAndSavePath(path) {
    if (path.indexOf('/detail') == -1) {
        cookie.save('location', path);
        return path;
    }
    if (cookie.load('location') != undefined) {
        return cookie.load('location');
    }
    return '/team/vue';
}

const MainMenu = (props) => (
    <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>

            <Logo style={{ float: 'left' }}/>
            <Nav style={{ float: 'right' }} isLoggedIn={props}/>
        </Header>
        <Layout>
            <Sider
                collapsedWidth="0"
                onBreakpoint={(broken) => {

                }}
                onCollapse={(collapsed, type) => {

                }}
            >

                <Menu theme="dark" mode="inline" defaultOpenKeys={['team', 'topic']} defaultSelectedKeys={[getAndSavePath(props.location.pathname)]}>

                    <SubMenu key="team" icon={<MailOutlined />} title="Team">
                        {teamRoute.map((e, index) => {
                            if (e.path != '*') {
                                return (
                                    <Menu.Item key={e.path} icon={<UserOutlined />}>
                                        <NavLink to={e.path}>{e.name }</NavLink>

                                    </Menu.Item>
                                );
                            }
                        })}
                    </SubMenu>
                    <SubMenu key="topic" icon={<AppstoreOutlined />} title="Topic">
                        {topicRoute.map((e, index) => {
                            if (e.path != '*') {
                                return (
                                    <Menu.Item key={e.path} icon={<UserOutlined />}>
                                        <NavLink to={e.path}>{e.name }</NavLink>

                                    </Menu.Item>
                                );
                            }
                        })}
                    </SubMenu>

                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: '100vh' }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Created by Noders Group</Footer>
            </Layout>
        </Layout>
    </Layout>
);
export default withRouter(MainMenu);
