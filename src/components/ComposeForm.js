import React from 'react'

class ComposeForm extends React.Component {
  constructor(props) {
    super(props)
    this.submitHandler = this.submitHandler.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage = async (subject, body) => {
    const composedMessage = {subject: subject, body: body}
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(composedMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    if (response.status === 200) {
      const json = await response.json()
      this.setState({
        messages: [...this.props, json]
      })
    } else {
      console.log('Unable to Add New Message', response.status);
    }
  }

  submitHandler(e) {
    e.preventDefault()
    const subject = document.querySelector('#subject').value || ''
    const body = document.querySelector('#body').value || ''
    this.props.history.push('/')
    this.sendMessage(subject, body)
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
