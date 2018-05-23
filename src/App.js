import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    console.log('json', json);
    this.setState({
      messages: json._embedded.messages
    })
  }

  sendMessage = async(subject, body) => {
    console.log('subject', subject);
    const composedMessage = {subject: subject, body: body}
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(composedMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (response.status === 200) {
      const json = await response.json()
      console.log('json', json);
      this.setState({
        messages: [...this.state.messages, json]
      })
    } else {
      console.log('Unable to Add New Message', response.status);
    }
  }

  async storeState(id, command, prop, value) {
    const data = {messageId: id, command: command}
    if (value !== null) {
      data[prop] = value
    }

    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  toggleClass = (message, className) => {
    const messages = this.state.messages
    const index = messages.indexOf(message)
    messages[index][className] = !messages[index][className]
    this.setState({
      id: index[className],
      messages: messages
    })
    if (className === 'starred') {
      const id = this.state.messages[index].idea
      this.storeState([id], 'star', 'star', this.state.messages[index][className])
    }
  }

  countMessages = () => {
    return this.state.messages.filter(message => !message.read).length
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
    let ids = []
    const messages = this.state.messages
    messages.filter(message => {
      if (message.selected) {
        message.read = messageStatus
        ids.push()
      }
    })
    this.setState({ messages: messages })
    this.storeState(ids, 'read', 'read', messageStatus)
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

composeMessage = () => {
  console.log('hello!')
  this.setState({
    btnClicked: !this.state.btnClicked,
    messageBody: null
  })
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
            composeMessage={this.composeMessage}
            sendMessage={this.sendMessage}
            />
          <MessageList messages={this.state.messages} toggleClass={this.toggleClass} />
        </section>
      )
  }
}
export default App;
