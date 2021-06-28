import React from 'react';
import MainMenu from '../../router/menus';

export default class TeamPage extends React.Component {
    state={
        name: '',
    }

    render = () => {
        return (
            <MainMenu>
                <p>TeamPage: {this.props.match.params.name}</p>
            </MainMenu>
        );
    }
}
