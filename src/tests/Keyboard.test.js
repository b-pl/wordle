import { render } from '@testing-library/react'
import Keyboard from '../components/Keyboard/Keyboard'

test('Contains skeleton', () => {
  render(<Keyboard />)
  const container = document.querySelector('.keyboard__container')
  const rows = document.querySelectorAll('.keyboard__row').length
  const buttons = document.querySelectorAll('button').length

  expect(container).toBeVisible()
  expect(rows).toBe(4)
  expect(buttons).toBe(37)
})