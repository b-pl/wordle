import { render } from '@testing-library/react'
import IconButton from '../components/IconButton/IconButton'

test('Contains button', () => {
  render(<IconButton />)
  const button = document.querySelector('button')

  expect(button).toBeVisible()
})