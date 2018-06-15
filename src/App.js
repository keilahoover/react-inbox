import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'

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

  storeState = async(id, command, key, value) => {
    const storeObj = {
      messageIds: id,
      command: command,
      [key]: value
    }

    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(storeObj),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }


  messageSelected = (message, className) => {
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
  }

  messageStarred = (message, starred) => {
    console.log(starred);
    const messages = this.state.messages
    if (starred === false) {
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
      this.storeState([message.id], 'star', 'star', true)
    } else {
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
      this.storeState([message.id], 'star', 'star', false)
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
    const messageSelected = this.state.messages.filter(message => message.selected)
    const idsSelected = messageSelected.map(message => message.id)
    messages.forEach(message => {
      if (message.selected) {
        message.read = boolean
      }
    })
    this.setState({ messages: messages })
    this.storeState(idsSelected, 'read', 'read', boolean)
  }

  deleteMessage = async (ids) => {
    //think about index maybe??
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
    const messages = this.state.messages
    const selectedMessage = messages.filter(message => message.selected)
    const idsSelected = selectedMessage.map(message => message.id)
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
    this.storeState(idsSelected, 'addLabel', 'label', label)
    this.setState({ messages: messages })
  }

  removeLabel = (label) => {
  const messages = this.state.messages
  const selectedMessage = this.state.messages.filter(message => message.selected === true)
  const idsSelected = selectedMessage.map(message => message.id)
  let index
  messages.forEach(message => {
    for (let i = 0; i < selectedMessage.length; i++) {
      index = messages.map(message => message.id).indexOf(selectedMessage[i].id)
      if (message.id === selectedMessage[i].id) {
        if (selectedMessage[i].labels.includes(label)) {
          return messages[index].labels = messages[index].labels.filter(message => message !== label)
        }
      }
    }
  })
  this.storeState(idsSelected, 'removeLabel', 'label', label)
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
            history={this.props.history}
            messages={this.state.messages}
            ids={this.state.ids}
            countMessages={this.countMessages}
            bulkSelectToggle={this.bulkSelectToggle}
            markAsReadToggle={this.markAsReadToggle}
            deleteMessage={this.deleteMessage}
            applyLabel={this.applyLabel}
            removeLabel={this.removeLabel}
            composeMessage={this.composeMessage}
            // sendMessage={this.sendMessage}
          />
          <MessageList messages={this.state.messages} messageStarred={this.messageStarred} messageSelected={this.messageSelected} />
          <ComposeForm messages={this.state.messages} history={this.props.history} sendMessage={this.sendMessage} />
        </section>
      )
  }
}
export default App;
