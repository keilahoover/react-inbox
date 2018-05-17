import React from 'react'

const Message = ({message, toggleClass}) => {

  const userRead = message.read ? 'read' : 'unread'
  const userStarred = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  const userSelected = message.selected ? 'selected' : ''
  const userChecked = message.selected ? true : false

  return (
    <section className={`row message ${userRead} ${userSelected}`}
      onClick = {() => {toggleClass(message, 'read')}}>
      <article className="col-xs-1">
        <aside className="row">
          <article className="col-xs-2">
            <input type="checkbox" checked={userChecked}
              onChange = {() => {
                toggleClass(message, 'selected')
              }} />
          </article>
          <article className='col-xs-2'>
          <i onClick={() => toggleClass(message, 'starred')} className={userStarred}></i>
          </article>
        </aside>
      </article>
      <article className="col-xs-11">
          {message.labels.map(label =>
            <span role="message-label" key={message.labels.indexOf(label)}
              className="label label-warning">{label}
            </span>
          )}
        <a href="#">{message.subject}</a>
      </article>
    </section>
  )
}

export default Message
