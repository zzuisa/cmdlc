import React from 'react';
import {
    Upload, message, Button, Divider,
    Comment, Tooltip, Avatar,
    Spin, Alert,
} from 'antd';
import socketClient from 'socket.io-client';
import MainMenu from '../../router/menus';
import Chat from '../Chat/Chat';

export default class TeamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // Hold the data to display when rendered, Updateable JavaScript objects

            name: 'private chatting room',
            // any other state datas
            socket: null,
        };
    }

    render = () => { // Describes what the UI should appear
        return (
            <MainMenu>
                <p>Welcone to: {this.props.match.params.name} {this.state.name}</p>

                <Divider plain>Messages</Divider>
                <Chat roomId={this.props.match.params.name} socket={this.state.socket} />

            </MainMenu>
        );
    }
}
