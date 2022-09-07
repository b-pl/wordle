import { render } from '@testing-library/react'
import Wrapper from '../components/Wrapper/Wrapper'

test('Contains skeleton', () => {
  render(<Wrapper />)
  const wrapper = document.querySelector('.wrapper')
  const rowsWrapper = document.querySelector('.rows__wrapper')
  const rowsContainer = document.querySelector('.rows__container')
  const rowsElements = document.querySelectorAll('.row').length
  const keyboardElement = document.querySelector('.keyboard__container')


  expect(wrapper).toBeVisible()
  expect(rowsWrapper).toBeVisible()
  expect(rowsContainer).toBeVisible()
  expect(rowsElements).toBe(6)
  expect(keyboardElement).toBeVisible()
})