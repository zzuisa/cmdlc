import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
// import db from './firebase';
import cookie from 'react-cookies';
import Message from './Message';
import ChatInput from './ChatInput';
import { notice, verify } from '../Common/Notice';
import $http from '../Util/PageHelper';

class Chat extends React.Component {
    state={
        roomDetails: null,
        roomMessages: [],
        roomId: this.props.roomId,
        pref: this.props.roomId.split('_')[0],
        mes: [],
    }

    setRoomDetails=(roomDetails) => {
        this.setState({
            roomDetails,
        });
    }

    setRoomMessages=(roomMessages) => {
        this.setState({
            roomMessages,
        });
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.roomId !== nextProps.roomId) {
            console.log('!!!!!!!!!!!!!!', nextProps.roomId);
            this.updateConversation(nextProps.roomId);
        }
    }

    updateConversation=(roomId) => {
        $http(`/api/conversations/${roomId}`)
            .then((res) => {
                let mes = res.data.content !== null ? res.data.content.messages : [];
                this.setRoomMessages(mes);
            });
    }

    componentWillMount=() => {
        if (this.state.roomId) {
            let { roomId } = this.props;
            $http(`/api/conversations/${roomId}`)
                .then((res) => {
                    let mes = res.data.content !== null ? res.data.content.messages : [];
                    this.setRoomMessages(mes);
                    this.props.socket.on('server_slide_message', (data) => {
                        console.log('rrrr', this.props.roomId);
                        console.log('rrrr22', data);
                        if (this.props.roomId === data.eventName) {
                            this.updateConversation(this.props.roomId);
                            notice();
                            mes.push({
                                _id: data._id,
                                create_time: data.create_time,
                                content: data.msg,
                            });
                            this.setRoomMessages([...mes]);
                        }
                    });
                });
        }
    }

    render() {
        return (
            <div className="chat">
                <div className="chat__messages" style={{ marginBottom: 100 }}>
                    {this.state.roomMessages.map(({
                        _id, user_id, content, create_time,
                    }) => (
                        <Message
                            key={_id}
                            message={content}
                            timestamp={create_time}
                            user={user_id == 0 ? 'System' : 'User'}
                            userImage={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                        />
                    ))}
                </div>
                <ChatInput style={{ marginTop: '100' }} channelName={this.props.roomId} channelId={this.props.roomId} type={'con'} socket={this.props.socket} />

            </div>
        );
    }
}

export default Chat;
