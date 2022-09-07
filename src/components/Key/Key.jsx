import React from 'react'
import './Key.css'

function Key (props) {
  return (
    <button type='button' className='key' data-key={props.dataKey}>
      {props.dataKey}
    </button>
  )
}

export default Key
