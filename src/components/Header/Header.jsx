import React from 'react'
import './Header.css'
import IconButton from '../IconButton/IconButton'
import { faQuestionCircle, faChartSimple, faGear } from '@fortawesome/free-solid-svg-icons'

function Header () {
  return (
    <div className='header'>
      <div className='header__logo'>
        <span className='header__text'>Łordl</span>
      </div>

      <div className='header__buttons'>
        <span className='header__button'>
          <IconButton id='faq' icon={faQuestionCircle} />
        </span>
        <span className='header__button'>
          <IconButton id='statistics' icon={faChartSimple} />
        </span>
        <span className='header__button'>
          <IconButton id='faq' icon={faGear} />
        </span>
      </div>
    </div>
  )
}

export default Header
