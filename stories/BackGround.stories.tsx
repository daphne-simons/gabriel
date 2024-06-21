// src/stories/Background.stories.js
import { vi } from 'vitest'
import React from 'react'
import Background from '../app/(site)/components/BackGround'
import getMoon from '@/query/utils/getMoonData'
import { fakeMoonRes } from '@/query/utils/nock-setup'

export default {
  title: 'Components/Background',
  component: Background,
}

const Template = (args) => <Background {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <div>This is the content inside Background component</div>,
}

// Mock the loadMoonPhases function for Storybook
vi.mock('../path/to/loadMoonPhases')

// Example usage in Storybook story
Default.decorators = [
  (Story) => {
    getMoon.mockResolvedValue(fakeMoonRes)
    return <Story />
  },
]
