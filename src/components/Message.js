import React from 'react'

class Message extends React.Component {
  userRead = () => {
    return this.props.message.read ? 'read' : 'unread'
  }

  userStarred = () => {
    return this.props.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  }

  userSelected = () => {
    return this.props.message.selected ? 'selected' : ''
  }

  userChecked = () => {
    return this.props.message.selected ? true : false
  }

  renderLabels = () => {
      return this.props.message.labels.map((label, i) => {
          return <span role="message-label" key={i}
              className="label label-warning">{label}
              </span> }
      )
  }

  render() {
    return (
      <section className={`row message ${this.userRead()} ${this.userSelected()}`}
              onClick={() => { this.props.toggleClass(this.props.message, 'read') }}>
              <article className="col-xs-1">
                <aside className="row">
                  <article className="col-xs-2">
                    <input type="checkbox" checked={this.userChecked()}
                      onChange={() => {
                        this.props.toggleClass(this.props.message, 'selected')
                    }} />
                  </article>
                  <article className='col-xs-2'>
                      <i onClick={() => this.props.toggleClass(this.props.message, 'starred')} className={this.userStarred()}></i>
                  </article>
                </aside>
              </article>
              <article className="col-xs-11">
                  {this.renderLabels()}
                  <a href="#">{this.props.message.subject}</a>
              </article>
            </section>
    )
  }
}

export default Message


// import React from 'react'
//
// class Message extends React.Component {
//
//   constructor(props){
//       super(props)
//       debugger
//       this.state = {
//         message: props.message,
//         toggleClass: props.toggleClass
//       }
//   }
//
//   userRead = () => {
//     return this.state.message.read ? 'read' : 'unread'
//   }
//
//   userStarred = () => {
//     return this.state.message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
//   }
//
//   userSelected = () => {
//     return this.state.message.selected ? 'selected' : ''
//   }
//
//   userChecked = () => {
//     return this.state.message.selected ? true : false
//   }
//
//   renderLabels = () => {
//       return this.state.message.labels.map((label, i) => {
//           return <span role="message-label" key={i}
//               className="label label-warning">{label}
//       </span> }
//       )
//   }
//
//   render() {
//     return (
//       <section className={`row message ${this.userRead()} ${this.userSelected()}`}
//         onClick={() => { this.state.toggleClass(this.state.message, 'read') }}>
//         <article className="col-xs-1">
//           <aside className="row">
//             <article className="col-xs-2">
//               <input type="checkbox" checked={this.userChecked()}
//                 onChange={() => {
//                   this.state.toggleClass(this.state.message, 'selected')
//               }} />
//             </article>
//             <article className='col-xs-2'>
//                 <i onClick={() => this.state.toggleClass(this.state.message, 'starred')} className={this.userStarred()}></i>
//             </article>
//           </aside>
//         </article>
//         <article className="col-xs-11">
//             {this.renderLabels()}
//             <a href="#">{this.state.message.subject}</a>
//         </article>
//       </section>
//     )
//   }
// }
//
// export default Message
