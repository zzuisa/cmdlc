import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { InfoOutlined, StarBorderOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
// import db from './firebase';
import cookie from 'react-cookies';
import { BackTop, Button } from 'antd';
import Message from './Message';
import ChatInput from './ChatInput';
import { notice, verify } from '../Common/Notice';
import $http from '../Util/PageHelper';

const style = {
    margin: 0,
    padding: 0,
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 14,
    fontVariant: 'tabular-nums',
    lineHeight: 1.5715,
    listStyle: 'none',
    fontFeatureSettings: 'tnum',
    position: 'fixed',
    right: 100,
    bottom: 100,
    zIndex: 10,
    width: 40,
    height: 40,
    cursor: 'pointer',
};
class Chat extends React.Component {
    state={
        roomDetails: null,
        roomMessages: [],
        roomId: this.props.roomId,
        pref: this.props.roomId.split('_')[0],
        mes: [],
        initClass: 'class2',

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
            // get the new state after path changed
            this.setRoomMessages([]);

            this.updateConversation(nextProps.roomId);
        }
    }

    updateConversation=(roomId) => {
        $http(`/api/conversations/${roomId}`)
            .then((res) => {
                let mes = res.data.content !== null ? res.data.content.messages : [];
                this.setRoomMessages(mes);
                this.setState({
                    initClass: mes.length < 10 ? 'class1' : 'class2',
                });
                this.scrollToBottom();
            });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    componentWillMount=() => {
        if (this.state.roomId) {
            let { roomId } = this.props;
            $http(`/api/conversations/${roomId}`)
                .then((res) => {
                    let mes = res.data.content !== null ? res.data.content.messages : [];
                    this.setRoomMessages(mes);
                    this.props.socket.on('server_slide_message', (data) => {
                        if (this.props.roomId === data.eventName) {
                            notice();

                            this.updateConversation(this.props.roomId);
                            // mes.push({
                            //     u_id: data.u_id,
                            //     user_id: data.name,
                            //     create_time: data.create_time,
                            //     content: data.msg,
                            //     avatar: data.eventAvatar,
                            // });
                            // ;
                            // this.setRoomMessages([...mes]);
                        }
                    });
                });
        }
    }

    render() {
        return (
            <div className="chat" style={{ marginBottom: 150 }}>
                <div className="chat__messages" style={{ marginBottom: 100 }}>
                    {this.state.roomMessages.map(({
                        _id, u_id, user_id, content, create_time, avatar,
                    }) => (
                        <Message
                            key={_id}
                            uId={u_id}
                            message={content}
                            timestamp={create_time}
                            user={user_id}
                            userImage={avatar}
                        />
                    ))}
                </div>

                <ChatInput style={{ marginTop: '100' }} initClass={this.state.initClass} channelName={this.props.roomId} messagesEnd={this.messagesEnd} channelId={this.props.roomId} type={'con'} socket={this.props.socket} />
                <Button type="primary" size="50px" shape="round" icon={<VerticalAlignBottomOutlined />} style={style} onClick={this.scrollToBottom} />
                <BackTop />
                <div style={{
                    zIndex: 1,
                    width: 1,
                    height: 1,
                    position: 'absolute',
                    bottom: 10,
                    float: 'left',
                    clear: 'both',
                }}
                ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}

export default Chat;
