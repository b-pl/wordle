import { render } from '@testing-library/react'
import Header from '../components/Header/Header'

test('Contains skeleton', () => {
  render(<Header />)
  const header = document.querySelector('.header')
  const logo = document.querySelector('.header__logo')
  const logo_text = document.querySelector('.header__text')
  const logo_text_content = document.querySelector('.header__text').textContent
  const buttonsWrapper = document.querySelector('.header__buttons')
  const buttonsContainers = document.querySelectorAll('.header__button').length


  expect(header).toBeVisible()
  expect(logo).toBeVisible()
  expect(logo_text).toBeVisible()
  expect(logo_text_content).toBe('Łordl')
  expect(buttonsWrapper).toBeVisible()
  expect(buttonsContainers).toBe(3)
})