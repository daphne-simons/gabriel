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

const Template = (args: any) => <Background {...args} />

export const Default = Template.bind({})

// Mock the loadMoonPhases function for Storybook
vi.mock('@/query/utils/getMoonData')

// Example usage in Storybook story
