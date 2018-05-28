import React from 'react'
//change to functional component
class Message extends React.Component {
  constructor(props) {
    super(props)

    this.onStar = this.onStar.bind(this)
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

  onStar (e) {
    e.stopPropagation()
    const starredMessage = this.props.message.starred
    this.props.messageStarred(this.props.message, starredMessage)
  }

  render() {
    const read = this.props.message.read ? 'read' : 'unread'
    const selected = this.props.message.selected ? 'selected' : ''
    const starred = this.props.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
    return (
      <div>
        <section className={`row message ${read} ${selected}`}>
          <article className="col-xs-1">
            <aside className="row">
              <article className="col-xs-2">
                <input type="checkbox" value={this.props.message.selected}
                  onChange={(e) => {
                    e.stopPropagation()
                    this.props.messageSelected(this.props.message, 'selected')
                  }} />
              </article>
              <article className='col-xs-2'>
                <i onClick={this.onStar} className={starred}></i>
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
