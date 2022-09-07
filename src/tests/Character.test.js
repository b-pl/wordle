import { render } from '@testing-library/react'
import Character from '../components/Character/Character'

test('Contains button', () => {
  render(<Character />)
  const wrapper = document.querySelector('.character__wrapper')

  expect(wrapper).toBeVisible()
})