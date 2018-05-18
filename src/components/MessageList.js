import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     messages: props.messages,
  //     toggleClass: props.toggleClass
  //   }
  // }

  render() {
    return (
      <article>
        {this.props.messages.map(message => <Message key={message.id} message={message} toggleClass={this.props.toggleClass}/>)}
      </article>
    )
  }
}

export default MessageList
