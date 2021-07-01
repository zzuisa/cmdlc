import React, { Component } from 'react';
import 'whatwg-fetch';
import {
    Button, Steps, Card, Radio,
    Layout, Menu, Breadcrumb,
} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import MainMenu from '../../router/menus';
import UserProfile from './UserProfile';

const { Header, Content, Footer } = Layout;

class Test extends Component {
    render=() => {
        return (
            <MainMenu>

                <Button type="primary">
                    {/* <Link to="/Profile">返回</Link> */}
                    sadsad
                </Button>

                <UserProfile/>
            </MainMenu>
        );
    }
}

export default Test;
