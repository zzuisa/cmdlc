import React from 'react';
import './Message.css';
import { Button, Card } from '@material-ui/core';

function Message({
    message, timestamp, user, userImage,
}) {
    return (
        <Card>
            <div className="message">
                <img src={userImage} alt="" />
                <div className="message__info">
                    <h4>
                        {user}{' '}
                        <span className="message__timestamp">
                            {timestamp}
                        </span>
                    </h4>
                    <p>{message}</p>
                </div>
            </div>
        </Card>
    );
}

export default Message;
