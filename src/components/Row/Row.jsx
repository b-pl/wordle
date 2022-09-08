import React, { useState } from 'react'
import Character from '../Character/Tile'
import './Row.css'

function Row () {
  const items = useState(Array(5).fill(<Character />))

  return (
    <div className='row'>
      { items && items.map((item) => {
        return item
      }) }
    </div>
  )
}

export default Row
