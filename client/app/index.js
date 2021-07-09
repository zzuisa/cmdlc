import React from 'react';
import { render } from 'react-dom';

import {
    HashRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom';

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import TopicPage from './components/Topic/TopicPage';
import TeamPage from './components/Team/TeamPage';
import SlideDetail from './components/Slide/SlideDetail';

import './styles/styles.scss';
import 'antd/dist/antd.css';
import UserProfile from './components/Profile/UserProfile';
import Login from './components/SignIn/Login';
import RegisterForm from './components/Signup/RegisterForm';

render((

    <Router>
        <App>
            <Switch>

                <Route exact path="/" component={Login}/>
                <Route path="/main" component={Home}/>
                <Route path="/register" component={RegisterForm}/>
                <Route path="/topic/:name" component={TopicPage}/>
                <Route path="/team/:name" component={TeamPage}/>
                <Route path="/detail/:id" component={SlideDetail}/>
                <Route path="/userSetting/profile" component={UserProfile}/>

                {/* <Route path="/login" component={Home}/> */}
                <Route component={NotFound}/>
            </Switch>
        </App>
    </Router>
), document.getElementById('app'));
