import React from 'react'
import ComposeForm from './ComposeForm'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages,
      countMessages: this.props.countMessages,
      bulkSelectToggle: this.props.bulkSelectToggle,
      markAsReadToggle: this.props.markAsReadToggle,
      deleteMessage: this.props.deleteMessage,
      applyLabel: this.props.applyLabel,
      removeLabel: this.props.removeLabel,
      composeMessage: this.props.composeMessage,
      formHidden: true
    }

    this.onApplyLabel = this.onApplyLabel.bind(this)
    this.onRemoveLabel = this.onRemoveLabel.bind(this)

  }

  selectTool = (messages) => {
    if (this.state.countMessages('selected') < 1) {
      return 'fa fa-check-square-o'
    } else if (this.state.countMessages('selected') < 4) {
      return 'fa fa-minus-square-o'
    } else {
      return 'fa fa-check-square'
    }
  }

  onApplyLabel(e) {
    e.preventDefault()
    this.state.applyLabel(this.state.messages, e.target.value)
  }

  onRemoveLabel(e) {
    e.preventDefault()
    this.state.removeLabel(e.target.value)
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

  render() {
    return (
      <div>
        <nav className="row toolbar">
          <section className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">
                {this.state.countMessages('read')}
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
                this.state.bulkSelectToggle()
              }}>
              <i className={this.selectTool()}></i>
            </button>

            <button className="btn btn-default"
              onClick={() => {
                this.state.markAsReadToggle(true)
              }}>
              Mark As Read
            </button>

            <button className="btn btn-default"
              onClick={() => {
                this.state.markAsReadToggle(false)
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
              onClick={() => {
                this.state.deleteMessage()
              }}>
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
