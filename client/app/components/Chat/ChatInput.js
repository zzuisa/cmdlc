import { Button, Card } from 'antd';
import React, { useState } from 'react';
import './ChatInput.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
// import firebase from 'firebase';
// import db from './firebase';
import { ContentUtils } from 'braft-utils';
import { useStateValue } from '../StateProvider';

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

         if (this.state.channelId && this.state.type === 'con') {
             fetch(`/api/conversations/slide_${this.state.channelId}`, {
                 method: 'POST',
                 body: JSON.stringify({ content: this.state.editorState.toHTML() }),
                 headers: {
                     'Content-Type': 'application/json',
                 },
             })
                 .then((res) => res.json())
                 .then((json) => {
                     this.state.socket.emit('message', this.state.editorState.toHTML());
                     this.clearContent();
                 });
         } else {
             let data = {
                 content: this.state.editorState.toHTML(),
                 page: this.state.channelName,
                 slide_id: this.state.channelId,
             };
             fetch('/api/slideComments', {
                 method: 'POST',
                 body: JSON.stringify(data),
                 headers: {
                     'Content-Type': 'application/json',
                 },
             })
                 .then((res) => res.json())
                 .then((json) => {
                     this.state.socket.emit('client_slide_comment', this.state.editorState.toHTML());
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
                 <Button size="large" type="primary" onClick={this.sendMessage} htmlType="submit">Submit</Button>

             </Card>
         );
     }
}
