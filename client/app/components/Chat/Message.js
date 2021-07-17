import React from 'react';
import './Message.css';
import { Button, Card } from '@material-ui/core';
import {
    Image, Tag,
} from 'antd';
import moment from 'moment';
import cookie from 'react-cookies';

const currentUser = cookie.load('userinfo');

function Message({
    uId, message, timestamp, user, userImage,
}) {
    return (
        <>
            {uId === currentUser._id
                ? <Card style={{ marginBottom: '1px' }} elevation={0} >
                    <div className="message_current">
                        <div className="msgBg_current">
                            <div className="message__info" >
                                <h4 style={{ float: 'right' }}>
                                    <span className="message__timestamp">
                                        {moment(`${timestamp}+02:00`, 'YYYY-MM-DD HH:mm:ssZ').fromNow()}
                                    </span>
                                    <Tag color="blue">you</Tag>

                                </h4>
                                <p dangerouslySetInnerHTML={{ __html: message }}></p>
                            </div>
                            <Image style={{ width: 60, borderRadius: '50%', margin: 10 }} src={userImage} alt="" />
                        </div>

                    </div>

                </Card>
                : <Card style={{ marginBottom: '2px' }} >
                    <div className="message">
                        <div className="msgBg">
                            <Image style={{ width: 60, borderRadius: '50%', margin: 10 }} src={userImage} alt="" />
                            <div className="message__info">
                                <h4>
                                    {user}{' '}
                                    <span className="message__timestamp">
                                        {moment(`${timestamp}+02:00`, 'YYYY-MM-DD HH:mm:ssZ').fromNow()}
                                    </span>
                                </h4>
                                <p dangerouslySetInnerHTML={{ __html: message }}></p>
                            </div>
                        </div>
                    </div>

                </Card>
            }
        </>

    );
}

export default Message;
