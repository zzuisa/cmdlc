import React from 'react';

import {
    Button,
    Step,
    Card,
    Radio,
    Comment,
    Tooltip,
    Avatar,
    Image,
    Row,
    Col,
    Divider,
    Skeleton,
    Spin,
    Alert,
    BackTop,
} from 'antd';
import { pdfjs, Document, Page } from 'react-pdf';
import socketClient from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import { Viewer, DocumentWrapper } from './styles';
import MainMenu from '../../router/menus';
import Message from '../Chat/Message';
import ChatInput from '../Chat/ChatInput';
import Chat from '../Chat/Chat';
import $http from '../Util/PageHelper';
import config from '../../../../config/config';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default class SlideDetail extends React.Component {
  state = {
      slide: {},
      numPages: null,
      pageNumber: 1,
      textValue: 1,
      spinning: true,
      roomMessages: [],
      id: this.props.match.params.id,
      controls: [
          'font-size', 'line-height',
          'text-color', 'bold', 'italic', 'underline', 'separator',
          'clear',
      ],
  };

  onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
  };

  componentDidUpdate=(prevProps, prevState) => {
      if (prevState.pageNumber !== this.state.pageNumber) {
          this.getSlideComment(this.state.pageNumber);
      }
  }

  componentWillMount = () => {
      let socket = socketClient(config.host);
      this.setState({
          socket,
          id: this.props.match.params.id,
      });
      this.getSlide(this.props.match.params.id);
      this.getSlideComment(1);
  };

  getSlide = (id) => {
      $http(`/api/detail/${id}`)
          .then((res) => {
              this.setState({
                  slide: res.data.content,
                  spinning: false,
              });
          });
  };

  setRoomMessages=(res) => {
      this.setState({
          roomMessages: res,
      });
  }

  getSlideComment = (page) => {
      $http(`/api/slideComments/${this.state.id == 0 ? this.props.match.params.id : this.state.id}/${page}`)

          .then((res) => {
              let { data } = res;
              let mes = data.content !== null ? data.content.data.messages : [];
              this.setRoomMessages(mes);
              this.state.socket.on('server_slide_comment', (r) => {
                  if (this.state.id === r.eventName) {
                      mes.push({
                          _id: r._id,
                          create_time: r.create_time,
                          content: r.msg,
                      });
                      this.setRoomMessages([...mes]);
                  }
              });
          });
  };

  prev = () => {
      if (this.state.pageNumber !== 1) {
          this.setState((prevState) => ({
              pageNumber: prevState.pageNumber - 1,
              textValue: prevState.pageNumber - 1,
          }));
      }
  };

  next = () => {
      if (this.state.pageNumber !== this.state.numPages) {
          this.setState((prevState) => ({
              pageNumber: prevState.pageNumber + 1,
              textValue: prevState.pageNumber + 1,

          }));
      }
  };

  textBlur=(e) => {
      e.persist();
      this.setState(() => ({
          pageNumber: this.state.textValue,
      }));
  }

textChange=(e) => {
    this.setState({
        textValue: parseInt(e.target.value),
    });
}

  render = () => {
      return (
          <MainMenu>
              <Card>
                  <Row justify="center" style={{ margin: 10 }}>
                      <Col span={15}>
                          <Spin tip="Loading..." spinning={this.state.spinning}>
                              <Viewer>
                                  <DocumentWrapper>
                                      <Document
                                          loading={
                                              <Image src="http://49.media.tumblr.com/0018b4de0800b3e822bc5a7895ccfc62/tumblr_nbp3g3IwBz1sq0qq9o1_400.gif"></Image>
                                          }
                                          onLoadSuccess={this.onDocumentLoadSuccess}
                                          file={`http://${config.host}${this.state.slide.path}`}
                                      >
                                          <Page
                                              style={{ width: '100%' }}
                                              size={[400, 400]}
                                              key="page"
                                              pageNumber={this.state.pageNumber}
                                          />
                                      </Document>
                                  </DocumentWrapper>
                              </Viewer>
                          </Spin>
                          <Row justify="center" style={{ margin: 10 }}>
                              <Col span={4}>
                                  <Button onClick={this.prev}>Prev</Button>
                              </Col>
                              <Col span={8} style={{ textAlign: 'center' }}>
                                  <span>
                                      <TextField size="small" type="number" onBlur={this.textBlur} onChange={this.textChange} style={{ width: 74, height: '32px' }} value={this.state.textValue} label="current" id="outlined-basic" variant="outlined" />
                                      <TextField size="small" disabled style={{ width: 54, height: '32px' }}
                                          label={`/${this.state.numPages}`}
                                          defaultValue={this.state.numPages}
                                          id="outlined-basic" variant="outlined" />
                                  </span>             </Col>
                              <Col span={4}>
                                  <Button onClick={this.next}>Next</Button>
                              </Col>
                          </Row>
                      </Col>
                      <Col span={9}>
                          <div className="chat">
                              <Spin tip="Loading..." spinning={this.state.spinning}>                 <div className="chat__messages" style={{
                                  marginBottom: 60, minHeight: 280, height: 280, overflowY: 'auto',
                              }}>
                                  {this.state.roomMessages.map(
                                      ({
                                          _id, user_id, content, create_time,
                                      }) => (
                                          <Message
                                              key={_id}
                                              message={content}
                                              timestamp={create_time}
                                              user={user_id == 0 ? 'System' : 'User'}
                                              userImage={
                                                  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                              }
                                          />
                                      ),
                                  )}
                              </div>
                              </Spin>
                              <ChatInput
                                  controls={this.state.controls}
                                  style={{ marginTop: '20', height: 300 }}
                                  channelName={this.state.pageNumber}
                                  channelId={this.state.id}
                                  socket={this.state.socket}
                              />
                          </div>
                      </Col>
                      <Divider plain style={{ color: '#888' }}>Public Message</Divider>
                      <Col span={24}>
                          <Chat roomId={`topic_${this.state.slide.topic}`} socket={this.state.socket} />     </Col> </Row>
                  <BackTop />

              </Card>
          </MainMenu>
      );
  };
}
