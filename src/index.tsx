import React from 'react';
import ReactDOM from 'react-dom';
import './style/reset.css';
import './style/normalize.css';
import './style/global.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ViewportProvider } from './components/Viewport';

ReactDOM.render(
    // <React.StrictMode>
    <ViewportProvider>
        <App />,
    </ViewportProvider>,

    //  </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
