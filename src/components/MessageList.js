import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      toggleClass: props.toggleClass
    }
  }

  render() {
    return (
      <article>
        {this.state.messages.map(message => <Message key={message.id} message={message} toggleClass={this.state.toggleClass}/>)}
      </article>
    )
  }
}

export default MessageList
