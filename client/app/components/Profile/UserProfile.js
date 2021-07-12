import React, { useState } from 'react';
import {

    Descriptions, Badge, Layout, Menu, Button,
} from 'antd';

import cookie from 'react-cookies';
import MainMenu from '../../router/menus';

const { Header, Content, Footer } = Layout;
export default class UserProfile extends React.Component {
    state = {

        userinfo: cookie.load('userinfo'),

    };

    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <MainMenu>
                <Descriptions title="User Info" bordered>

                    <Descriptions.Item label="Name">{ this.state.userinfo === undefined ? '' : this.state.userinfo.name}</Descriptions.Item>

                    <Descriptions.Item label="Email">{ this.state.userinfo === undefined ? '' : this.state.userinfo.email}</Descriptions.Item>
                    <Descriptions.Item label="Account Creation Time" span={2}>
                        { this.state.userinfo === undefined ? '' : this.state.userinfo.create_time}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" color= 'green' text="Verified" />

                    </Descriptions.Item>
                    <Descriptions.Item label="Channels">{ this.state.userinfo === undefined ? '' : this.state.userinfo.channels}</Descriptions.Item>
                    <Descriptions.Item label="Current tasks">TaskOne</Descriptions.Item>

                </Descriptions>
            </MainMenu>
        );
    }
}
