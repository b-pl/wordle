import React from 'react'

function Key (props) {
  return (
    <button type='button' className='key' data-key={props.dataKey}>
      {props.dataKey}
    </button>
  )
}

export default Key
