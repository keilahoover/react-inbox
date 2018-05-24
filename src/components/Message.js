import React from 'react'
//change to functional component
class Message extends React.Component {

  userRead = () => {
    return this.props.message.read ? 'read' : 'unread'
  }

  userSelected = () => {
    return this.props.message.selected ? 'selected' : ''
  }

  userChecked = () => {
    return this.props.message.selected ? true : false
  }

  renderLabels = () => {
    if (this.props.message.labels !== undefined) {
      return this.props.message.labels.map((label, i) => {
          return <span role="message-label" key={i}
                 className="label label-warning">{label}
              </span> }
      )
    }
  }

  render() {
    const starred = this.props.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
    return (
      <div>
        <section className={`row message ${this.userRead()} ${this.userSelected()}`}>
          <article className="col-xs-1">
            <aside className="row">
              <article className="col-xs-2">
                <input type="checkbox" value={this.props.message.selected}
                  onChange={(e) => {
                    e.stopPropagation()
                    this.props.toggleClass(this.props.message, 'selected')
                  }} />
              </article>
              <article className='col-xs-2'>
                <i onClick={(e) => {
                  e.stopPropagation()
                  console.log('star clicked??');
                  this.props.toggleClass(this.props.message, 'starred')
                }} className={starred}></i>
              </article>
            </aside>
          </article>
          <article className="col-xs-11">
            {this.renderLabels()}
            <a href="#">{this.props.message.subject}</a>
          </article>
        </section>
        <section>
        </section>
      </div>
    )
  }
}

export default Message
