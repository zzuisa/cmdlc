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

                <Route exact path="/login" component={Login}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={RegisterForm}/>
                <Route exact path="/topic/:name" component={TopicPage}/>
                <Route exact path="/team/:name" component={TeamPage}/>
                <Route exact path="/detail/:id" component={SlideDetail}/>
                <Route exact path="/userSetting/profile" component={UserProfile}/>

                {/* <Route path="/login" component={Home}/> */}
                <Route component={NotFound}/>
            </Switch>
        </App>
    </Router>
), document.getElementById('app'));
