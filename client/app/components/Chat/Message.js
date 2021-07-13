import React from 'react';
import './Message.css';
import { Button, Card } from '@material-ui/core';
import {
    Image,
} from 'antd';
import moment from 'moment';

function Message({
    message, timestamp, user, userImage,
}) {
    return (
        <Card style={{ marginBottom: '2px' }}>
            <div className="message">
                <Image style={{ width: 60, borderRadius: '50%', margin: 10 }} src={userImage} alt="" />
                <div className="message__info">
                    <h4>
                        {user}{' '}
                        <span className="message__timestamp">
                            {moment(timestamp).fromNow()}
                        </span>
                    </h4>
                    <p dangerouslySetInnerHTML={{ __html: message }}></p>
                </div>
            </div>
        </Card>
    );
}

export default Message;
