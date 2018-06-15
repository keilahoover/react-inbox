import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App'
import ComposeForm from './components/ComposeForm';
import Message from './components/Message';
import MessageList from './components/MessageList';



const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/compose' component={ComposeForm} />
        {/* <Route exact path={'/messages'} component={MessageList} /> */}
      </Switch>
    </Router>
  )
}

export default RouterComponent;
