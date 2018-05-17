import React, { Component } from 'react';
import './App.css';

import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {messages: this.props.messages}
  }

  toggleClass = (message, className) => {
    const index = this.state.messages.indexOf(message)
    this.state.messages[index][className] = !this.state.messages[index][className]
    this.setState({
      id: index[className],
      messages: this.state.messages
    })
  }

  countMessages = (property) => {
    let count = 0;
    this.state.messages.forEach(message => {
      if(message[property]) {
        count++
      }
    })
    return count
  }

  bulkSelectToggle = () => {
    if (this.countMessages('selected') < this.state.messages.length) {
      this.state.messages.filter(message => {
        message.selected = true
      })
    this.setState({ messages: this.state.messages })
    } else {
      this.state.messages.filter(message => {
        message.selected = false
      })
    }
    this.setState({ messages: this.state.messages })
  }

  markAsReadToggle = (messageStatus) => {
    this.state.messages.filter(message => {
      if (message.selected) {
        message.read = messageStatus
      }
    })
    this.setState({ messages: this.state.messages })
  }

  deleteMessage = () => {
    let messages = this.state.messages
    messages.filter(message => {
      if (message.selected) {
        messages.splice(messages.indexOf(message), 1)
      }
    })
    this.setState({ messages: messages})
  }

  render() {
    return (
      <section className="container">
        <h1>REACT INBOX</h1>
        <Toolbar
          messages={this.state.messages}
          countMessages={this.countMessages}
          bulkSelectToggle={this.bulkSelectToggle}
          markAsReadToggle={this.markAsReadToggle}
          deleteMessage={this.deleteMessage}
          />
        <ComposeForm />
        <MessageList messages={this.state.messages} toggleClass={this.toggleClass} />
      </section>
    )
  }
}
export default App;
