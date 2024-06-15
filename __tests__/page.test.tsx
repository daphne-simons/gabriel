import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
// import Home from '../app/(site)/page'
import HomeLogo from '../app/(site)/components/HomeLogo'
test('Page', () => {
  // This one doesn't work for some reason
  // render(<Home />)
  render(<HomeLogo fontSettings={{ wght: 200, opsz: 72 }} />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Gabriel' })
  ).toBeDefined()
})
