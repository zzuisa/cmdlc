import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
// import db from './firebase';
import Message from './Message';
import ChatInput from './ChatInput';
import { notice, verify } from '../Common/Notice';

const Chat = (props) => {
    const { roomId } = props;
    const [roomDetails, setRoomDetails] = useState(null);
    let [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if (verify(roomId)) {
            fetch(`/api/conversations/slide_${props.roomId}`)
                .then((res) => res.json())
                .then((content) => {
                    let mes = content.messages;
                    setRoomMessages(mes);

                    props.socket.on('output', (data) => {
                        notice();
                        mes.push({
                            _id: data._id,
                            create_time: data.create_time,
                            content: data.msg,
                        });
                        setRoomMessages([...mes]);
                    });
                });

            // let socket = socketClient('localhost:8080', { transports: ['websocket', 'polling', 'flashsocket'] });
        } else {
            fetch(`/api/conversations/${props.roomId}`)
                .then((res) => res.json())
                .then((content) => {
                    if (content !== null) {
                        let mes = content.messages;
                        setRoomMessages(mes);

                        props.socket.on('server_slide_message', (data) => {
                            console.log('11', data);
                            notice();
                            mes.push({
                                _id: data._id,
                                create_time: data.create_time,
                                content: data.msg,
                            });
                            setRoomMessages([...mes]);
                        });
                    } else {
                        console.log('convers', content);
                    }
                });
        }
    }, [roomId]);

    return (
        <div className="chat">
            <div className="chat__messages" style={{ marginBottom: 100 }}>
                {roomMessages.map(({
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
            <ChatInput style={{ marginTop: '100' }} channelName={props.roomId} channelId={props.roomId} type={'con'} socket={props.socket} />
        </div>
    );
};

export default Chat;
