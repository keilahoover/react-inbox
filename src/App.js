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

  updateLabelStatus = (messageStatus, label) => {
    const oldMessages = this.state.messages
    const newMessages = oldMessages.map(message => {
      const oldLabels = message.labels
      return {
        ...message,
        labels: [...oldLabels, 'foo']
      }
      // if (message.selected) {
      //   if (messageStatus && !message.labels.includes(label) && label !== 'false') {
      //     message.labels = [...message.labels, label]
      //   } else if (!messageStatus && messages.labels.includes(label)){
      //     message.labels.splice(message.labels.indexOf(label), 1)
      //   }
      // }
    })
    this.setState({ messages: newMessages })
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
          updateLabelStatus={this.updateLabelStatus}
          />
        <ComposeForm />
        <MessageList messages={this.state.messages} toggleClass={this.toggleClass} />
      </section>
    )
  }
}
export default App;
