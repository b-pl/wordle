import { render, screen } from '@testing-library/react'
import Header from '../components/Header/Header'
import Wrapper from '../components/Wrapper/Wrapper'

// test('Contains header', () => {
//   render(<Wrapper />)
//   const headerElement = render(<Header />)
//   expect(headerElement).toBe(true)
// })

test('Contains 6 rows', () => {
  render(<Wrapper />)
  const rowsElements = document.querySelectorAll('.row').length
  expect(rowsElements).toBe(6)
})

test('Contains keyboard container', () => {
  render(<Wrapper />)
  const keyboardElement = document.querySelector('.keyboard__container')
  expect(keyboardElement).toBeVisible()
})