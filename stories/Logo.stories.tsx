import type { Meta, StoryObj } from '@storybook/react'

import HomeLogo from '../app/(site)/components/Logos/HomeLogo'

const meta: Meta<typeof HomeLogo> = {
  title: 'HomeLogo',
  component: HomeLogo,
}

type Story = StoryObj<typeof HomeLogo>

export const HeadingHome: Story = {
  name: 'Home Logo - fixed settings',
  render: () => (
    <div className="flex justify-center items-center h-screen p-40">
      <HomeLogo fontSettings={{ wght: 1000, opsz: 72 }} />
    </div>
  ),
}


export default meta
