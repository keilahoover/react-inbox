import React from 'react'

class ComposeForm extends React.Component {
  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler(e) {
    e.preventDefault()
    const subject = document.querySelector('#subject').value || ''
    const body = document.querySelector('#body').value || ''
    this.props.sendMessage(subject, body)
  }

  render() {

    return (
      <form className={this.props.formHidden ? "form-horizontal well hidden" : "form-horizontal well"}
        onSubmit={ this.submitHandler }
      >
        <section className="form-group">
          <aside className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </aside>
        </section>
        <section className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <aside className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </aside>
        </section>
        <section className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <aside className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </aside>
        </section>
        <section className="form-group">
          <aside className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" />
          </aside>
        </section>
      </form>
    )
  }
}

export default ComposeForm
