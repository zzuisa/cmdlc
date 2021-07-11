import React, { useState } from 'react';
import {

    Descriptions, Badge, Layout, Menu, Button,
} from 'antd';

import MainMenu from '../../router/menus';

const { Header, Content, Footer } = Layout;
export default class UserProfile extends React.Component {
    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <MainMenu>
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Name">Jing Song</Descriptions.Item>   <Descriptions.Item label="Email">xxx@163.com</Descriptions.Item>
                    {/* <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item> */}
                    <Descriptions.Item label="Account Creation Time" span={2}>
          2019-04-24 18:00:00
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" color= 'green' text="Verified" />   </Descriptions.Item>
                    <Descriptions.Item label="Affiliated Groups">Noders</Descriptions.Item>
                    <Descriptions.Item label="Current tasks">TaskOne</Descriptions.Item>   {/* <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
                        <br />
          Database version: 3.4
                        <br />
          Package: dds.mongo.mid
                        <br />
          Storage space: 10 GB
                        <br />
          Replication factor: 3
                        <br />
          Region: East China 1<br />
                    </Descriptions.Item> */}
                </Descriptions>
            </MainMenu>
        );
    }
}
