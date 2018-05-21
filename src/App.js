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
    const messages = this.state.messages
    const index = messages.indexOf(message)
    messages[index][className] = !messages[index][className]
    this.setState({
      id: index[className],
      messages: messages
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
    const messages = this.state.messages
    if (this.countMessages('selected') < messages.length) {
      messages.filter(message => {
        message.selected = true
      })
    this.setState({ messages: messages })
    } else {
        messages.filter(message => {
        message.selected = false
      })
    }
    this.setState({ messages: messages })
  }

  markAsReadToggle = (messageStatus) => {
    const messages = this.state.messages
    messages.filter(message => {
      if (message.selected) {
        message.read = messageStatus
      }
    })
    this.setState({ messages: messages })
  }

  deleteMessage = () => {
    const messages = this.state.messages
    messages.filter(message => {
      if (message.selected) {
        messages.splice(messages.indexOf(message), 1)
      }
    })
    this.setState({ messages: messages})
  }


  applyLabel = (prevMessages, label) => {
    const messages = prevMessages.slice()
    const selectedMessages = messages.map(message => {
      if (message.selected === true) {
        return message.labels.indexOf(label) === -1 ? {...message, labels: [...message.labels, label]} : message
      }
    })
    this.setState({ messages: selectedMessages })
  }

  removeLabel = (label) => {
  const messages = this.props.messages
  const selectedMessage = messages.filter(message => message.selected === true)
  messages.forEach(message => {
    for (let i = 0; i < selectedMessage.length; i++) {
      if (message.id === selectedMessage[i].id) {
        if (selectedMessage[i].labels.includes(label)) {
          return messages[message.id - 1].labels = messages[message.id - 1].labels.filter(message => message !== label)
        }
      }
    }
  })
  this.setState({ messages: messages })
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
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          />
        <ComposeForm />
        <MessageList messages={this.state.messages} toggleClass={this.toggleClass} />
      </section>
    )
  }
}
export default App;
