import React from 'react';
import {
    Upload, message, Button, Divider,
    Comment, Tooltip, Avatar, Card,
    Spin, Alert,
} from 'antd';
import socketClient from 'socket.io-client';
import MainMenu from '../../router/menus';
import Chat from '../Chat/Chat';
import config from '../../../../config/config';

export default class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // Hold the data to display when rendered, Updateable JavaScript objects

            name: 'private chatting room',
            // any other state datas
            socket: null,
        };
    }

    componentWillMount=() => {
        let socket = socketClient(config.nginxHost);
        this.setState({
            socket,
        });
    }

    render = () => { // Describes what the UI should appear
        return (
            <MainMenu>
                <Card style={{ margin: 20, borderRadius: 5 }}>
                    <Divider plain>Messages</Divider>
                    <Chat roomId={`team_${this.props.match.params.name}`} socket={this.state.socket} />
                </Card>

            </MainMenu>
        );
    }
}
