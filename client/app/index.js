import React from 'react';
import { render } from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from 'react-router-dom';

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import TopicPage from './components/Topic/TopicPage';
import TeamPage from './components/Team/TeamPage';

import './styles/styles.scss';
import 'antd/dist/antd.css';

render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/topic/:name" component={TopicPage}/>
                <Route path="/team/:name" component={TeamPage}/>
                <Route component={NotFound}/>
            </Switch>
        </App>
    </Router>
), document.getElementById('app'));
