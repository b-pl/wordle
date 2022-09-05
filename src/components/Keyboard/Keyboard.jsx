import React from 'react'
import Key from '../Key/Key'

function Keyboard () {
  const row0 = ['ą', 'ć', 'ę', 'ł', 'ó', 'ś', 'ń', 'ż', 'ź']
  const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

  return (
    <>
      <div className='keyboard__row'>
        {
          row0 && row0.map((el) => {
            console.log(el)
            return <Key key={el} dataKey={el} />
          })
        }
      </div>
      <div className='keyboard__row'>
        {
          row1 && row1.map((el) => {
            return <Key key={el} dataKey={el} />
          })
        }
      </div>
      <div className='keyboard__row'>
        {
          row2 && row2.map((el) => {
            return <Key key={el} dataKey={el} />
          })
        }
      </div>
      <div className='keyboard__row'>
        {
          row3 && row3.map((el) => {
            return <Key key={el} dataKey={el} />
          })
        }
      </div>
    </>
  )
}

export default Keyboard
