import React, { Component } from 'react';
import './App.css';

import MessageList from './components/MessageList'
// import Toolbar from './components/Toolbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {messages: this.props.messages}
  }

  toggleClass(message, className) {
    const index = this.state.messages.indexOf(message)
    this.state.messages[index][className] = !this.state.messages[index][className]
    this.setState({
      messages: this.state.messages
    })
  }

  render() {
    return (
      <section className="container">
        <h1>REACT INBOX</h1>
        <MessageList messages={this.state.messages} toggleClass={this.state.toggleClass} />
      </section>
    )
  }
}
export default App;