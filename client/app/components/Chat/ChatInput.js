import { Button, message, BackTop } from 'antd';
import Card from '@material-ui/core/Card';

import React, { useState } from 'react';
import './ChatInput.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
// import firebase from 'firebase';
// import db from './firebase';
import { ContentUtils } from 'braft-utils';
import { SendOutlined } from '@ant-design/icons';
import cookie from 'react-cookies';
import { InfoOutlined, StarBorderOutlined, VerticalAlignBottomOutlined } from '@material-ui/icons';
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
// window.addEventListener('keypress', (event) => {
//     ;
//     if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
//     alert('Ctrl-S pressed');
//     event.preventDefault();
//     return false;
// });

export default class ChatInput extends React.Component {
    // const [input, setInput] = useState('');
    // // const [{ user }] = useStateValue();
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
    }

    state = {
        editorState: BraftEditor.createEditorState(null),
        channelName: this.props.channelName,
        channelId: this.props.channelId,
        type: this.props.type,
        socket: this.props.socket,
        user: cookie.load('userinfo'),
        divClass: 'class1',
        readOnly: false,
        pending: false,
    }

    componentWillMount=() => {
        window.addEventListener('scroll', this.bindScroll);

        // const scrollTop = (window.srcElement ? window.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (window.srcElement ? window.srcElement.body.scrollTop : 0);
        // const clientHeight = (window.srcElement && window.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // const scrollHeight = (window.srcElement && window.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // const height = scrollHeight - scrollTop - clientHeight;
        //
    }

    componentWillUnmount=() => {
        // window.removeEventListener('scroll');
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.channelId !== nextProps.channelId) {
            // get the new state after path changed
            this.setState({
                divClass: 'class1',
            });
        }
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

    scrollToBottom = () => {
        this.props.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    bindScroll=(event) => {
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        const height = scrollHeight - scrollTop - clientHeight;
        if (scrollTop >= 900 || height <= 200) {
            this.setState({
                divClass: 'class1',
            });
        } else {
            this.setState({
                divClass: 'class2',
            });
        }
    }

    onKeyPressed = (event) => {
        if (!event.shiftKey && event.key === 'Enter') {
            this.sendMessage(event);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.channelName != prevProps.channelName) {
            this.setState({
                channelName: this.props.channelName,
            });
        }
    }

     sendMessage = (e) => {
         e.preventDefault();
         if (this.state.pending) {
             message.warning('pending!');
             return;
         }

         if (this.state.editorState.toText().trim() == ''
          && !this.state.editorState.toHTML().includes('img')) {
             message.error('Please text something!');
             return;
         }
         this.setState({
             readOnly: true,
             pending: true,
         });
         let htmlContent = this.state.editorState.toHTML();
         this.clearContent();

         let content = {
             eventUser: this.state.user,
             eventName: this.props.channelId,
             content: htmlContent,
         };
         if (this.props.channelId && this.props.type === 'con') {
             let eventName = 'client_slide_message';

             $http(`/api/conversations/${this.props.channelId}`, {
                 method: 'POST',
                 data: {
                     content: htmlContent,
                     eventUser: this.state.user,
                 },

             }).then((res) => {
                 this.state.socket.emit(eventName, content);
                 this.setState({
                     readOnly: false,
                     pending: false,

                 });

                 this.state.form.focus();
             });
         } else {
             let data = {
                 eventUser: this.state.user,
                 content: htmlContent,
                 page: this.state.channelName,
                 slide_id: this.state.channelId,
                 eventName: `${this.state.channelId}#${this.state.channelName}`,

             };
             $http('/api/slideComments', {
                 method: 'POST',
                 data,

             }).then((res) => {
                 let eventName = 'client_slide_comment';
                 this.state.socket.emit(eventName, data);
                 this.clearContent();
                 this.setState({
                     readOnly: false,
                     pending: false,

                 });

                 this.state.form.focus();
             });
         }
     };

     onBEBlur=(e) => {
         ;
         ;
     }

     getReverse = (c) => {
         return c === 'class2' ? 'class3' : 'class2';
     }

     render() {
         const { editorState } = this.state;

         return (
             <Card onKeyDown={this.onKeyPressed}
                 className={this.props.initClass !== 'class3' ? this.state.divClass : 'class3' }
                 style={{
                     position: this.props.type === 'con' ? 'fixed' : 'relevant',
                     bottom: 50,
                     padding: 20,
                     boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
                 }}>
                 <BraftEditor
                     placeholder="Type something :)"
                     controls={this.props.controls ? this.props.controls : controls}
                     language={'en'}
                     style={{
                         width: '100%', overflowX: 'hidden', overflowY: 'hidden', zIndex: 99, height: 250,
                     }}
                     contentStyle={{ height: 200, minHeight: 200 }}
                     textBackgroundColor={true}
                     value={this.state.editorState} onChange={this.handleChange}/>

                 <Button type="primary" style={{ float: 'left' }} shape="circle" icon={<SendOutlined />}
                     size={'large'}
                     onClick={this.sendMessage} htmlType="submit" />
             </Card>
         );
     }
}
