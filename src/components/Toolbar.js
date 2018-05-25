import React from 'react'
import ComposeForm from './ComposeForm'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formHidden: true
    }

    this.onDeleteMessage = this.onDeleteMessage.bind(this)
    this.onApplyLabel = this.onApplyLabel.bind(this)
    this.onRemoveLabel = this.onRemoveLabel.bind(this)

  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      messages: newProps.messages
    })
  }

  selectTool = (messages) => {
    if (this.props.countMessages('selected') < 1) {
      return 'fa fa-check-square-o'
    } else if (this.props.countMessages('selected') < 4) {
      return 'fa fa-minus-square-o'
    } else {
      return 'fa fa-check-square'
    }
  }

  onApplyLabel(e) {
    e.preventDefault()
    return this.props.applyLabel(e.target.value)
  }

  onRemoveLabel(e) {
    e.preventDefault()
    return this.props.removeLabel(e.target.value)
  }

  onComposeMessage() {
    if (this.state.formHidden) {
      this.setState({
        ...this.state,
        formHidden: false
      })
    } else {
      this.setState({
        ...this.state,
        formHidden: true
      })
    }
  }

  onDeleteMessage(e) {
    e.preventDefault()
    const messages = this.props.messages
    const messageSelected = messages.filter(message => message.selected)
    const idsSelected = messageSelected.map(message => message.id)
    return this.props.deleteMessage(idsSelected)
  }

  render() {
    return (
      <div>
        <nav className="row toolbar">
          <section className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">
                { this.props.messages.length - this.props.countMessages('read')}
              </span>
              unread messages
            </p>

            <a className="btn btn-danger"
              onClick={() => {
                this.onComposeMessage()
              }}
            >
              <i className="fa fa-plus">
              </i>
            </a>

            <button className="btn btn-default"
              onClick={() => {
                this.props.bulkSelectToggle()
              }}>
              <i className={this.selectTool()}></i>
            </button>

            <button className="btn btn-default"
              onClick={() => {
                this.props.bulkSelectToggle()
              }}>
              Mark As Read
            </button>

            <button className="btn btn-default"
              onClick={() => {
                this.props.bulkSelectToggle()
              }}>
              Mark As Unread
            </button>

            <select className="form-control label-select" defaultValue="default"
              onChange={this.onApplyLabel}>
              <option disabled={true} value="default">Apply label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" defaultValue="default"
              onChange={this.onRemoveLabel}>
              <option disabled={true} value="default">Remove label</option>
              <option value="dev">dev</option>
              <option value="personal">personal</option>
              <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default"
              onClick={this.onDeleteMessage
              }>
              <i className='fa fa-trash-o'></i>
            </button>

          </section>
        </nav>
        <section className="container">
          <ComposeForm formHidden={this.state.formHidden} sendMessage={this.props.sendMessage}/>
        </section>
    </div>
    )
  }

}

export default Toolbar
