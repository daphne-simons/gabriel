import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
// import Home from '../app/(site)/page'
import HomeLogo from '../app/(site)/components/Logos/HomeLogo'
test('Page', () => {
  // TODO: Fix this test.
  // render(<Home />)
  render(<HomeLogo fontSettings={{ wght: 200, opsz: 72 }} logoColor="text-white" />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Gabriel' })
  ).toBeDefined()
})
