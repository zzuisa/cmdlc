import React, {
    useCallback,
    useState,
    useMemo,
} from 'react';
import PropTypes from 'prop-types';
import {
    Button, Step, Card, Radio,
    Comment, Tooltip, Avatar,
    Image,
    Row, Col, Divider,
} from 'antd';
import { pdfjs, Document, Page } from 'react-pdf';
import Measure from 'react-measure';

import moment from 'moment';
import {
    DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled,
} from '@ant-design/icons';
import throttle from 'lodash/throttle';
import {
    Viewer,
    DocumentWrapper,
} from './styles';
import MainMenu from '../../router/menus';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default class TopicPage extends React.Component {
        state={
            slide: {},
            numPages: null,
            pageNumber: 1,
        }

        onDocumentLoadSuccess= ({ numPages }) => {
            this.setState({ numPages });
        }

        componentWillMount=() => {
            this.getSlide(this.props.match.params.id);
        }

        getSlide = (id) => {
            fetch(`/api/detail/${id}`)
                .then((res) => res.json())
                .then((json) => {
                    console.log('js', json);
                    this.setState({
                        slide: json,
                    });
                });
        }

        prev=() => {
            if (this.state.pageNumber !== 1) {
                this.setState(
                    (prevState) => ({ pageNumber: prevState.pageNumber - 1 }),
                );
            }
        }

        next=() => {
            if (this.state.pageNumber !== this.state.numPages) {
                this.setState(
                    (prevState) => ({ pageNumber: prevState.pageNumber + 1 }),
                );
            }
        }

      render=() => {
          return (
              <MainMenu>
                  <Card>
                      <Row justify="center" style={{ margin: 10 }}>
                          <Col span={16}>
                              <Viewer>
                                  <DocumentWrapper>
                                      <Document
                                          loading={<Image src="http://49.media.tumblr.com/0018b4de0800b3e822bc5a7895ccfc62/tumblr_nbp3g3IwBz1sq0qq9o1_400.gif"></Image>}
                                          onLoadSuccess={this.onDocumentLoadSuccess}
                                          file={`http://localhost:8080${this.state.slide.path}`}
                                      >
                                          <Page
                                              style={{ width: '100%' }}
                                              size={[600, 400]}
                                              key="page"
                                              pageNumber={this.state.pageNumber}
                                          />
                                      </Document>
                                  </DocumentWrapper>
                              </Viewer>
                              <Row justify="center" style={{ margin: 10 }}>
                                  <Col span={4}><Button onClick={this.prev}>Prev</Button></Col>
                                  <Col span={4}><span>Page {this.state.pageNumber} of {this.state.numPages}</span></Col>
                                  <Col span={4}><Button onClick={this.next}>Next</Button></Col>
                              </Row>
                          </Col>
                          <Col span={8}>

                          </Col>

                      </Row>
                  </Card>
              </MainMenu>
          );
      }
}
