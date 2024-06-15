import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/(site)/page'

test('Page', () => {
  render(<Home />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Gabriel' })
  ).toBeDefined()
})
