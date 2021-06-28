import React from 'react';
import MainMenu from '../../router/menus';

export default class TopicPage extends React.Component {
    state={
        name: '',
    }

    render = () => {
        return (
            <MainMenu>
                <p>TopicPage: {this.props.match.params.name}</p>
            </MainMenu>
        );
    }
}
