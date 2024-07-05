import type { Meta, StoryObj } from '@storybook/react'
import {
  FullMoonBg,
  FirstQuarterBg,
  LastQuarterBg,
  NewMoonBg,
  WaningBg,
  WaningGibbousBg,
  WaxingBg,
  WaxingGibbousBg,
} from './FakeComponents/MoonBgs'
import HomeLogo from '../app/(site)/components/Logos/HomeLogo'

const meta: Meta<typeof NewMoonBg> = {
  title: 'Phases HomePage',
  component: NewMoonBg,
}

type Story = StoryObj<typeof NewMoonBg>

export const BG1: Story = {
  name: 'New Moon',
  render: () => (
    <NewMoonBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </NewMoonBg>
  ),
}

export const BG2: Story = {
  name: 'Waxing',
  render: () => (
    <WaxingBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </WaxingBg>
  ),
}

export const BG3: Story = {
  name: 'First Quarter',
  render: () => (
    <FirstQuarterBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </FirstQuarterBg>
  ),
}
export const BG4: Story = {
  name: 'Waxing Gibbous',
  render: () => (
    <WaxingGibbousBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </WaxingGibbousBg>
  ),
}
export const BG5: Story = {
  name: 'Full Moon',
  render: () => (
    <FullMoonBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </FullMoonBg>
  ),
}
export const BG6: Story = {
  name: 'Waning Gibbous',
  render: () => (
    <WaningGibbousBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </WaningGibbousBg>
  ),
}
export const BG7: Story = {
  name: 'Last Quarter',
  render: () => (
    <LastQuarterBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </LastQuarterBg>
  ),
}
export const BG8: Story = {
  name: 'Waning',
  render: () => (
    <WaningBg>
      <div className="flex items-center justify-center h-screen">
        <HomeLogo fontSettings={{ wght: 500, opsz: 50 }} />
      </div>
    </WaningBg>
  ),
}
export default meta
