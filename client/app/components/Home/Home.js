/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import 'whatwg-fetch';
import {
    Steps, Radio,
    Layout, Menu, Breadcrumb,
} from 'antd';
import 'antd/dist/antd.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import $http from '../Util/PageHelper';
import UserProfile from '../Profile/UserProfile';
import MainMenu from '../../router/menus';
import SlideList from '../Slide/SlideList';
import './home.css';

const { Header, Content, Footer } = Layout;

const { Step } = Steps;
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counters: [],
        };
    }

    componentDidMount() {
        // let style = document.createElement('style');
        // style.innerHTML = `
        //     .ant-layout-content{
        //         margin:0 !important
        //     }
        //     `;
        // document.head.appendChile(style);
        $http('/api/counters')
            .then((res) => {
                this.setState({
                    counters: res.data,
                });
            });
    }

    render() {
        return (
            <MainMenu props='false'>
                <Card style={{ margin: 0, width: '100%' }}>
                    <CardActionArea onClick={() => { window.open('https://github.com/zzuisa/cmdlc'); }}>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            width="100%"
                            image="assets/img/bg.png"
                            title="Contemplative Reptile"
                        />

                    </CardActionArea>
                </Card>
            </MainMenu>

        );
    }
}

export default Home;
