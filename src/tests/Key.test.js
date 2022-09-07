import { render } from '@testing-library/react'
import Key from '../components/Key/Key'

test('Contains button', () => {
  render(<Key />)
  const button = document.querySelector('button')

  expect(button).toBeVisible()
})