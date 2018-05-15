import React from 'react'

const Message = ({message, toggleClass}) => {

  const userRead = message.read ? 'read' : 'unread'
  const userStarred = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  const userSelected = message.selected ? 'selected' : ''
  const userChecked = message.selected ? 'checked' : ''

  return (
    <section className={`row message ${userRead} ${userSelected}`}
      onChange = {() => {toggleClass(message, "read")}}>
      <article className="col-s-1">
        <aside className="row">
          <article className="col-s-2">
            <input type="checkbox" checked={userChecked}
              onChange = {(e) => {
                e.preventDefault()
                toggleClass(message, "selected")
              }} />
          </article>
        </aside>
      </article>
    </section>
  )
}

export default Message






//   const isRead = message.read ? 'read' : 'unread'
//   const isSelected = message.selected ? 'selected' : ''
//   const isChecked = message.selected ? 'checked' : ''
//   const isStarred = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
//
//   return (
//     <div className={`row message ${isRead} ${isSelected}`}
//       onClick = {() => {toggleClass(message, "read")}}>
//       <div className="col-xs-1">
//         <div className="row">
//           <div className="col-xs-2">
//           <input type="checkbox" checked={isChecked}
//             onChange = {(e) => {
//             e.stopPropagation()
//             toggleClass(message, "selected")
//           }} />
//           </div>
//           <div className={`col-xs-2 ${isStarred}`}
//             onClick = {(e) => {
//             e.stopPropagation()
//             toggleClass(message, "starred")
//             }}>
//             <i></i>
//           </div>
//         </div>
//       </div>
//       <div className="col-xs-11">
//         {message.labels.map((label) =>
//           <span key={message.labels.indexOf(label)}
//             className="label label-warning">{label}
//           </span>)}
//         <a>
//           {message.subject}
//         </a>
//       </div>
//     </div>
//   )
// }
