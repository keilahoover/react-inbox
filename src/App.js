import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      ids: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({
      ...this.state,
      messages: json._embedded.messages
    })
  }

  sendMessage = async(subject, body) => {
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

  storeState = async(id, command, prop, value) => {
    const data = {messageId: id, command: command}
    if (value !== null) {
      data[prop] = value
    }

    const response = await fetch('http://localhost:8082/api/messages', {
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
    if (className === 'selected') {
      this.setState({
        ids: [ ...this.state.ids, message.id],
        messages: messages.map((msg, i) => {
          if (message.id === msg.id) {
            msg = {
              ...msg,
              selected: !msg.selected
            }
          }
          return msg
        })
      })
    }
    if (className === 'starred') {
      this.setState({
        ids: [ ...this.state.ids, message.id],
        messages: messages.map((msg, i) => {
          if (message.id === msg.id) {
            msg = {
              ...msg,
              starred: !msg.starred
            }
          }
          return msg
        })
      })
      // this.storeState([id], 'star', 'star', this.state.messages[index][className])
    }
  }

  countMessages = (property) => {
    let count = 0
    this.state.messages.forEach(message => {
      if (message[property]) {
        count++
      }
    })
    return count
  }

  bulkSelectToggle = () => {
    const messages = this.state.messages
    if (this.countMessages('selected') < messages.length) {
      const messageSelected = messages.filter(message => message.selected = true)
      console.log(messageSelected);
      this.setState({ messages: messages })
    } else {
        messages.filter(message => message.selected = false)
        this.setState({ messages: messages })
        console.log(messages);
    }
  }

  markAsReadToggle = (boolean) => {
    const messages = this.state.messages
    messages.forEach(message => {
      if (message.selected) {
        message.read = boolean
      }
    })
    this.setState({ messages: messages })
  }


  storeState = async(id, command, prop, value) => {
    const data = {messageId: id, command: command}
    if (value !== null) {
      data[prop] = value
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }


  deleteMessage = async (ids) => {
    let deletedMessages = {
      messageIds: ids,
      command: 'delete'
    }
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(deletedMessages),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (response.status === 200) {
      const messages = this.state.messages.filter(m => !ids.includes(m.id))
      console.log(messages);
      this.setState({
        ...this.state.messages,
        messages,
      })
    }
  }

  applyLabel = (label) => {
    let messages = this.state.messages
    let selectedMessage = messages.filter(message => message.selected === true)
    let index
    messages.forEach(message => {
      for (let i = 0; i < selectedMessage.length; i++) {
        index = messages.map(message => message.id).indexOf(selectedMessage[i].id)
        if (message.id === selectedMessage[i].id) {
          if (!selectedMessage[i].labels.includes(label)) {
            return messages[index] = {...message, labels: [...message.labels, label]}
          }
        }
      }
    })
    console.log(messages);
    this.setState({ messages: messages })
    // const selectedMessages = messages.map(message => {
    //   if (message.selected === true) {
    //     return message.labels.indexOf(label) === -1 ? {...message, labels: [...message.labels, label]} : message
    //   }
    // })
    // this.setState({ messages: selectedMessages })
  }

  removeLabel = (label) => {
  const messages = this.state.messages
  const selectedMessage = this.state.messages.filter(message => message.selected === true)
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

//do I need this?
composeMessage = () => {
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
            ids={this.state.ids}
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





  // deleteMessageIds = (id) => {
  //   const messages = this.state.messages
  //   // const newMessage = ...this.state.messages
  //   messages.filter(message => {
  //     if (message.selected) {
  //       messages.splice(messages.indexOf(message), 1)
  //       this.state.ids.push(id)
  //     }
  //   })
  //   this.storeDeleteMessage(this.state.ids)
  //   this.setState({ messages: messages})
  // }
