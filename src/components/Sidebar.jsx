import React from 'react'
import './Sidebar.css'

const Sidebar = (props) => {
  return (
    <div id="sidebar">
    <img src={props.img} alt={props.name} />
    <div>
      <p id="name">{props.name} </p>
      <p className='it'>by {props.author} </p>
    </div>
    <div>
      <p><b>Description:</b></p>
      <p className='it'> {props.summary} </p>
    </div>
  </div>
  )
}

export default Sidebar;