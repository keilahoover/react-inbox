import React from 'react'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: this.props.messages,
      countMessages: this.props.countMessages,
      bulkSelectToggle: this.props.bulkSelectToggle,
      markAsReadToggle: this.props.markAsReadToggle
    }
  }

  selectTool = (messages) => {
    if (this.state.countMessages('selected') < 1) {
      return 'fa fa-check-square-o'
    } else {
      return 'fa fa-check-square'
    }
  }

  render() {
    return (
      <nav className="row toolbar">
        <section className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">
            {this.state.messages.length - this.state.countMessages('read')}
            </span>
            unread messages
          </p>

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

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>

        </section>
      </nav>
    )
  }

}

export default Toolbar
