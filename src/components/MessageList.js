import React, { Fragment } from 'react'
import Message from './Message'

function MessageList({messages, toggleClass}) {
  return (
    <Fragment>
      {messages.map((message, i) =>
        (
          <Message
            key={i}
            message={message}
            toggleClass={toggleClass}
          />
        )
      )}
    </Fragment>
  )
}

export default MessageList
