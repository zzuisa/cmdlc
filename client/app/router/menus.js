import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './menus.css';
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
const MainMenu = (props) => (

    <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>

            <Logo style={{ float: 'left' }}/>
            <Nav style={{ float: 'right' }}/>
        </Header>
        <Layout>
            <Sider
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                {/* <Button type="primary" size="large" >Logo</Button> */}

                <Menu theme="dark" mode="inline" defaultOpenKeys={['team', 'topic']} defaultSelectedKeys={['1']}>

                    <SubMenu key="team" icon={<MailOutlined />} title="Team">
                        {teamRoute.map((e, index) => {
                            if (e.path != '*') {
                                return (
                                    <Menu.Item key={index} icon={<UserOutlined />}>
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
                                    <Menu.Item key={index + 3} icon={<UserOutlined />}>
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
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    </Layout>
);
export default MainMenu;
