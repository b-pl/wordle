import React, { useState } from 'react'
import Header from '../Header/Header'
import '../../css/rootStylesheet.css'
import './Wrapper.css'
import Row from '../Row/Row'
import Keyboard from '../Keyboard/Keyboard'

function Wrapper () {
  const rows = useState(Array(6).fill(<Row />))

  return (
    <div className='wrapper'>
      <Header />
      <div className='rows__wrapper'>
        <div className='rows__container'>
          <div className='rows'>
            {
              rows && rows.map((row) => {
                return row
              })
            }
          </div>
        </div>
      </div>

      <Keyboard />
    </div>
  )
}

export default Wrapper
