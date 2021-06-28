import React, { Component } from 'react';
import 'whatwg-fetch';
import {
    Button, Steps, Card, Radio,
    Layout, Menu, Breadcrumb,
} from 'antd';
import 'antd/dist/antd.css';
import SlideList from '../Slide/SlideList';
import MainMenu from '../../router/menus';

const { Header, Content, Footer } = Layout;

const { Step } = Steps;
const test = [{ name: 'React' }, { name: 'Vue' }];
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counters: [],
        };

        this.newCounter = this.newCounter.bind(this);
        this.incrementCounter = this.incrementCounter.bind(this);
        this.decrementCounter = this.decrementCounter.bind(this);
        this.deleteCounter = this.deleteCounter.bind(this);

        this._modifyCounter = this._modifyCounter.bind(this);
    }

    componentDidMount() {
        fetch('/api/counters')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    counters: json,
                });
            });
    }

    newCounter() {
        fetch('/api/counters', { method: 'POST' })
            .then((res) => res.json())
            .then((json) => {
                let data = this.state.counters;
                data.push(json);

                this.setState({
                    counters: data,
                });
            });
    }

    incrementCounter(index) {
        const id = this.state.counters[index]._id;

        fetch(`/api/counters/${id}/increment`, { method: 'PUT' })
            .then((res) => res.json())
            .then((json) => {
                this._modifyCounter(index, json);
            });
    }

    decrementCounter(index) {
        const id = this.state.counters[index]._id;

        fetch(`/api/counters/${id}/decrement`, { method: 'PUT' })
            .then((res) => res.json())
            .then((json) => {
                this._modifyCounter(index, json);
            });
    }

    deleteCounter(index) {
        const id = this.state.counters[index]._id;

        fetch(`/api/counters/${id}`, { method: 'DELETE' })
            .then((_) => {
                this._modifyCounter(index, null);
            });
    }

    _modifyCounter(index, data) {
        let prevData = this.state.counters;

        if (data) {
            prevData[index] = data;
        } else {
            prevData.splice(index, 1);
        }

        this.setState({
            counters: prevData,
        });
    }

    render() {
        return (
            <MainMenu>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

                    <p>Counters:</p>
                    <SlideList slides={test}/>
                    <ul>
                        { this.state.counters.map((counter, i) => (
                            <li key={i}>
                                <span>{counter.count} </span>
                                <button onClick={() => this.incrementCounter(i)}>+</button>
                                <button onClick={() => this.decrementCounter(i)}>-</button>
                                <button onClick={() => this.deleteCounter(i)}>x</button>
                            </li>
                        )) }
                    </ul>

                    <button onClick={this.newCounter}>New counter</button>
                </Content></MainMenu>
        );
    }
}

export default Home;
