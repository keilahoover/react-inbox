import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Router from './router';

ReactDOM.render(<Router/>, document.getElementById('root'));
registerServiceWorker();
