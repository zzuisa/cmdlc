import { Button, Card } from 'antd';
import React, { useState } from 'react';
import './ChatInput.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
// import firebase from 'firebase';
// import db from './firebase';
import { ContentUtils } from 'braft-utils';
import { SendOutlined } from '@ant-design/icons';
import cookie from 'react-cookies';
import { useStateValue } from '../StateProvider';
import { notice, verify } from '../Common/Notice';
import $http from '../Util/PageHelper';

const controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media', 'separator',
    'clear',
];

export default class ChatInput extends React.Component {
    // const [input, setInput] = useState('');
    // // const [{ user }] = useStateValue();
    state = {
        editorState: BraftEditor.createEditorState(null),
        channelName: this.props.channelName,
        channelId: this.props.channelId,
        type: this.props.type,
        socket: this.props.socket,
        user: cookie.load('userinfo'),
    }

    componentWillMount=() => {
    }

    submitContent = async() => {
        // Pressing ctrl + s when the editor has focus will execute this method
        const htmlContent = this.state.editorState.toHTML();
        const result = await saveEditorContent(htmlContent);
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState });
    }

    setInput=(v) => {
        this.setState({
            input: v,
        });
    }

    handleChange = (editorState) => {
        this.setState({ editorState });
    }

    clearContent = () => {
        this.setState({
            editorState: ContentUtils.clear(this.state.editorState),
        });
    }

     sendMessage = (e) => {
         e.preventDefault();
         let content = {
             eventUser: this.state.user,
             eventName: this.props.channelId,
             content: this.state.editorState.toHTML(),
         };

         if (this.props.channelId && this.props.type === 'con') {
             let eventName = 'client_slide_message';

             $http(`/api/conversations/${this.props.channelId}`, {
                 method: 'POST',
                 data: {
                     content: this.state.editorState.toHTML(),
                     eventUser: this.state.user,
                 },

             }).then((res) => {
                 this.state.socket.emit(eventName, content);
                 this.clearContent();
             });
         } else {
             let data = {
                 eventUser: this.state.user,
                 content: this.state.editorState.toHTML(),
                 page: this.state.channelName,
                 slide_id: this.state.channelId,
             };
             $http('/api/slideComments', {
                 method: 'POST',
                 data,

             }).then((res) => {
                 let eventName = 'client_slide_comment';
                 this.state.socket.emit(eventName, content);
                 this.clearContent();
             });
         }
     };

     render() {
         const { editorState } = this.state;

         return (
             <Card>
                 <BraftEditor
                     controls={this.props.controls ? this.props.controls : controls}
                     language={'en'}
                     style={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden' }}
                     contentStyle={{ height: 200, minHeight: 200 }}
                     textBackgroundColor={true}
                     value={this.state.editorState} onChange={this.handleChange}/>
                 <Button type="primary" style={{ float: 'right' }} shape="circle" icon={<SendOutlined />}
                     size={'large'} onClick={this.sendMessage} htmlType="submit" />
             </Card>
         );
     }
}
