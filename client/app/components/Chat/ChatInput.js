import { Button, Card } from 'antd';
import React, { useState } from 'react';
import './ChatInput.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
// import firebase from 'firebase';
// import db from './firebase';
import { ContentUtils } from 'braft-utils';
import { useStateValue } from '../StateProvider';

export default class ChatInput extends React.Component {
    // const [input, setInput] = useState('');
    // // const [{ user }] = useStateValue();
    state = {
        editorState: BraftEditor.createEditorState(null),
        channelName: this.props.channelName,
        channelId: this.props.channelId,
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

         if (this.state.channelId) {
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
         }
     };

     render() {
         const { editorState } = this.state;

         return (
             <Card>
                 <BraftEditor
                     language={'en'}
                     style={{ width: '100%', overflowX: 'hidden' }}
                     contentStyle={{ height: 400 }}
                     textBackgroundColor={true}
                     value={this.state.editorState} onChange={this.handleChange}/>
                 <Button size="large" type="primary" onClick={this.sendMessage} htmlType="submit">Submit</Button>

             </Card>
         );
     }
}
