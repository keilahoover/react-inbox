import React from 'react'
import Message from './Message'

class MessageList extends React.Component {

  render() {
    return (
      <article>
        {this.props.messages.map((message, i) => <Message key={i} message={message} toggleClass={this.props.toggleClass}/>)}
      </article>
    )
  }
}

export default MessageList
