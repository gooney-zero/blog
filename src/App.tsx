import React from 'react';

import './App.less';

import Routes from './routes';
import { StoreHOC } from './store';

function App() {
    return <Routes />;
}

export default StoreHOC(App);
