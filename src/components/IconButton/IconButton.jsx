/* eslint-disable react/prop-types */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function IconButton (props) {
  return (
    <button type='button'>
      <FontAwesomeIcon icon={props.icon} />
    </button>
  )
}

export default IconButton
