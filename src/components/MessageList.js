import React, { Fragment } from 'react'
import Message from './Message'

function MessageList({messages, messageStarred, messageSelected}) {
  return (
    <Fragment>
      {messages.map((message, i) =>
        (
          <Message
            key={i}
            message={message}
            messageStarred={messageStarred}
            messageSelected={messageSelected}
          />
        )
      )}
    </Fragment>
  )
}

export default MessageList
