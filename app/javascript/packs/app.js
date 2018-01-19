import '../app-styles';
import React from 'react';
import ReactDOM from 'react-dom';

import { appState } from '../app/appState.js';

/*** Main app component ***/
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        appState.subscribe(this.forceUpdate.bind(this, null));
    }
    render() {
        return (
            <p>This is a react app.</p>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
});
