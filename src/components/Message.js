import React from 'react'

const Message = ({message, toggleClass}) => {

  const userRead = message.read ? 'read' : 'unread'
  const userStarred = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  const userSelected = message.selected ? 'selected' : ''
  const userChecked = message.selected ? 'checked' : ''

  return (
    <section className={`row message ${userRead} ${userSelected}`}
      onClick = {() => {toggleClass(message, "read")}}>
      <article className="col-xs-1">
        <aside className="row">
          <article className="col-xs-2">
            <input type="checkbox" checked={userChecked}
              onChange = {(e) => {
                e.preventDefault()
                toggleClass(message, "selected")
              }} />
          </article>
          <article className={`col-xs-2 ${userStarred}`}
            onChange={(e) => {
              e.preventDefault()
              toggleClass(message, "starred")
          }}>
          </article>
        </aside>
      </article>
      <article className="col-xs-11">
          {message.labels.map(label =>
            <span role="message-label" key={message.labels.indexOf(label)}
              className="label">{label}
            </span>
          )}
        <a href="#">{message.subject}</a>
      </article>
    </section>
  )
}

export default Message
