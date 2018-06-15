import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App'
import ComposeForm from './components/ComposeForm';

const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/compose' component={ComposeForm} />
      </Switch>
    </Router>
  )
}

export default RouterComponent;
