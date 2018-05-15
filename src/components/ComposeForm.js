import React from 'react'

class ComposeForm extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <form className="form-horizontal well">
        <section className="form-group">
          <aside classname="col-sm-8 col-sm-offset-2">
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
          <label htmlFor="body" class="col-sm-2 control-label">Body</label>
          <aside className="col-sm-8">
            <textarea name="body" id="body" class="form-control"></textarea>
          </aside>
        </section>
        <section className="form-group">
          <aside className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" class="btn btn-primary" />
          </aside>
        </section>
      </form>
    )
  }

}

export default ComposeForm
