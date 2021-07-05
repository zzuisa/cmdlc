import {
    Button, Step, Card, Radio,
    Comment, Tooltip, Avatar,
    Image,
    Row, Col, Divider,
    Skeleton,
    Spin, Alert,
} from 'antd';
import { pdfjs, Document, Page } from 'react-pdf';
import {
    Viewer,
    DocumentWrapper,
} from './styles';
import MainMenu from '../../router/menus';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default class SlideDetail extends React.Component {
        state={
            slide: {},
            numPages: null,
            pageNumber: 1,
            spinning: true,
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
                    this.setState({
                        slide: json,
                        spinning: false,
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
                              <Spin tip="Loading..." spinning={this.state.spinning}>
                                  <Viewer>
                                      <DocumentWrapper>
                                          <Document
                                              loading={<Image src="http://49.media.tumblr.com/0018b4de0800b3e822bc5a7895ccfc62/tumblr_nbp3g3IwBz1sq0qq9o1_400.gif"></Image>}
                                              onLoadSuccess={this.onDocumentLoadSuccess}
                                              file={`http://localhost:8080${this.state.slide.path}`}
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
                                  <Col span={4}><Button onClick={this.prev}>Prev</Button></Col>
                                  <Col span={4}><span>Page {this.state.pageNumber} of {this.state.numPages}</span></Col>
                                  <Col span={4}><Button onClick={this.next}>Next</Button></Col>
                              </Row>
                          </Col>
                          <Col span={8}>
                              <Skeleton active />
                              <Skeleton active />
                              <Skeleton active />
                              <Skeleton active />
                          </Col>

                      </Row>
                  </Card>
              </MainMenu>
          );
      }
}
