import type { Meta, StoryObj } from '@storybook/react'
import { ReactNode } from 'react'
import BackGround from '../app/(site)/components/BackGround'

// Define the component props type explicitly
type BackGroundProps = {
  theme: {
    id: number
    bgColor: string
    bgImg: string
    textColor: string
    outlineColor: string
    btnSearchBg: string
    hoverSearchBg: string
  } | undefined
  children: ReactNode
}

const meta: Meta<BackGroundProps> = {
  title: 'Components/BackGround',
  component: BackGround,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<BackGroundProps>

// Simple test theme
const testTheme = {
  id: 1,
  bgColor: 'bg-blue-500',
  bgImg: 'bg-gradient-to-r from-blue-400 to-purple-500',
  textColor: 'text-white',
  outlineColor: 'border-white',
  btnSearchBg: 'bg-white',
  hoverSearchBg: 'hover:bg-gray-100',
}

// Simple default story
export const Default: Story = {
  args: {
    theme: testTheme,
    children: <div className="p-8 text-white">Hello World</div>,
  },
}