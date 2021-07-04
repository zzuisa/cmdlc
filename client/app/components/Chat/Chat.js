import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
// import db from './firebase';
import Message from './Message';
import ChatInput from './ChatInput';

const Chat = (props) => {
    console.log('vv', props);
    const { roomId } = props;
    const [roomDetails, setRoomDetails] = useState(null);
    let [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            fetch(`/api/conversations/slide_${props.roomId}`)
                .then((res) => res.json())
                .then((content) => {
                    console.log('content', content);
                    setRoomMessages(content.messages);
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
                        user={user_id == 0 ? 'System' : user_id}
                        userImage={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                    />
                ))}
            </div>
            <ChatInput style={{ marginTop: '100' }} channelName={props.roomId} channelId={props.roomId} />
        </div>
    );
};

export default Chat;
