// .storybook/preview.ts

import { addDecorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MoonApiResponse } from '@/app/(site)/models/models' // Adjust the import path as needed
import '../public/main.css' // Adjust the path to your CSS file

import Background from '../components/Background'

const server = setupServer(
  rest.get('https://www.icalendar37.net/lunar/api/', (req, res, ctx) => {
    // Mock response data based on your API's structure
    const mockData: MoonApiResponse = {
      phase: {
        // Mock phase data here
      },
      // Add other mock data properties as needed
    }

    return res(ctx.json(mockData))
  })
)

// Establish a connection to the server before running your tests.
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const queryClient = new QueryClient()

const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// Decorate your stories with providers (like Redux Provider, ThemeProvider, etc)
addDecorator((Story) => (
  <QueryClientProvider client={queryClient}>
    <div className="bg-gray-900 min-h-screen">
      <Story />
    </div>
  </QueryClientProvider>
))

export const parameters
