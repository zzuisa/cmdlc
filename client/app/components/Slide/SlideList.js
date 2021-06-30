import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Step, Card, Radio,
    Comment, Tooltip, Avatar,
    Image,
} from 'antd';
import moment from 'moment';
import {
    DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SlideDetail from './SlideDetail';

function SlideList(props) {
    return (
        <Card>
            <Radio.Group defaultValue="a" buttonStyle="solid">
                {
                    props.slides.map((s, index) => (
                        <Comment
                            key={index}
                            author={<a>Han Solo</a>}
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <Card title={s.name}>
                                    {/* <SlideDetail/> */}
                                    <Link to={`/detail/${s._id}`}>
                                        <Image
                                            preview={false}
                                            width={100}
                                            src="https://zh.wizcase.com/wp-content/uploads/2020/02/Powerpoint-logo.png"
                                        /></Link>

                                </Card>
                            }
                            datetime={
                                <Tooltip title={moment(s.create_time).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span>{moment(s.create_time).fromNow()}</span>
                                </Tooltip>
                            }
                        />
                        // <Radio.Button style={{ float: 'left' }} value={ s.name} key={index}>{ s.name}</Radio.Button>
                    ))
                }
            </Radio.Group>

        </Card>

    );
}

SlideList.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        des: PropTypes.string,
        create_time: PropTypes.string,
        update_time: PropTypes.string,
    })),
};

export default SlideList;
