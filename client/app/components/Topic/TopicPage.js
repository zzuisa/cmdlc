import React from 'react';
import {
    Card,
    Upload, message, Button, Divider,
    Comment, Tooltip, Avatar,
    Spin, Alert,
    BackTop,
} from 'antd';
import {
    UploadOutlined, DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled,
} from '@ant-design/icons';
import moment from 'moment';
import socketClient from 'socket.io-client';
import MainMenu from '../../router/menus';
import SlideList from '../Slide/SlideList';
import Chat from '../Chat/Chat';
import $http from '../Util/PageHelper';
import config from '../../../../config/config';
import './topic.css';

const props = {
    name: 'file',
    showUploadList: false,

};
const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};
export default class TopicPage extends React.Component {
    state={
        name: '',
        socket: null,
        uploader: {
            action: '',
            name: '',
        },
        slides: [],
        flag: 0,
        spinning: true,
    }

    componentWillMount=() => {
        let socket = socketClient(config.nginxHost);
        this.setState({
            socket,
        });
    }

    componentDidMount=() => {
        setTimeout(() => {
            this.getSlides(this.props.match.params.name);
        }, 1000);
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.getSlides(nextProps.match.params.name);
        }
    }

    onChange = (info) => {
        if (info.file.status !== 'uploading') {
            this.setState({
                spinning: true,
            });

            const formData = new FormData();
            formData.append('file', info.file.originFileObj);
            formData.append('topic', this.props.match.params.name);

            fetch('/api/commons/lecture', {
                method: 'POST',

                body: formData,
            }).then((json) => {
                message.success(`${info.file.name} file uploaded successfully`);
                this.getSlides(this.props.match.params.name);
                this.setState({
                    spinning: false,
                });
            });
        }
    }

    getSlides(topic) {
        this.setState({
            spinning: true,
        });
        $http(`/api/slides/${topic}`)

            .then((res) => {
                this.setState({
                    slides: res.data.content,
                    spinning: false,
                });
            });
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
    };

    render = () => {
        return (
            <MainMenu>
                <Card style={{ margin: 20, borderRadius: 5 }}>
                    <Spin tip="Loading..." spinning={this.state.spinning}>
                        <Upload {...props} onChange={this.onChange}>
                            <Button type='primary' icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <SlideList slides={this.state.slides}/>
                        <Divider plain>Text</Divider>
                        <Chat roomId={`topic_${this.props.match.params.name}`} socket={this.state.socket} />
                    </Spin>
                </Card>

            </MainMenu>
        );
    }
}
