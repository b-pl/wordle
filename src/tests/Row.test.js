import { render } from '@testing-library/react'
import Row from '../components/Row/Row'

test('Renders 5 elements (keys)', () => {
  render(<Row />)
  const elements = document.querySelectorAll('.character__wrapper').length
  expect(elements).toBe(5)
})