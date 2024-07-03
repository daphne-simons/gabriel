import type { Meta, StoryObj } from '@storybook/react'

import {
  FullMoonBg,
  LastQuarterBg,
  NewMoonBg,
  WaningBg,
  WaningGibbousBg,
  WaxingBg,
  WaxingGibbousBg,
} from './BackGroundClones/MoonBgs'
import Image from 'next/image'

const meta: Meta<typeof NewMoonBg> = {
  title: 'BackGrounds',
  component: NewMoonBg,
}

type Story = StoryObj<typeof NewMoonBg>

// const themes = [
//   {
//     phase: 'New Moon',
//     bgValue: 'bg-gray-800',
//     textValue: 'text-white',
//     bgImg: 'bg-moon-bg',
//   },
//   {
//     phase: 'Waxing',
//     bgValue: 'bg-gray-500',
//     textValue: 'text-white',
//     bgImg: 'bg-moon-bg-80',
//   },
//   {
//     phase: 'First Quarter',
//     bgValue: 'bg-gray-300',
//     textValue: 'text-white',
//     bgImg: 'bg-moon-bg-80',
//   },
//   {
//     phase: 'Waxing Gibbous',
//     bgValue: 'bg-gray-200',
//     textValue: 'text-white',
//     bgImg: 'bg-moon-bg-60',
//   },
//   {
//     phase: 'Full Moon',
//     bgValue: 'bg-gray-100',
//     textValue: 'text-white',
//     bgImg: `{bg-[url('/moon-bg-60.png')]`,
//   },
//   {
//     phase: 'Waning Gibbous',
//     bgValue: 'bg-gray-200',
//     textValue: 'text-gray-950',
//     bgImg: 'bg-moon-bg-60',
//   },
//   {
//     phase: 'Last Quarter',
//     bgValue: 'bg-gray-300',
//     textValue: 'text-gray-950',
//     bgImg: 'bg-moon-bg-80',
//   },
//   {
//     phase: 'Waning',
//     bgValue: 'bg-gray-500',
//     textValue: 'text-black',
//     bgImg: 'bg-moon-bg-60',
//   },
// ]

export const BG1: Story = {
  name: 'New Moon',
  render: () => (
    <div className="">
      <NewMoonBg />
      <Image
        src="/moon-bg.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}

export const BG2: Story = {
  name: 'Waxing',
  render: () => (
    <div className="h-screen w-full">
      <WaxingBg />
      <Image
        src="/moon-bg-80.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}

export const BG3: Story = {
  name: 'First Quarter',
  render: () => (
    <div className="h-screen w-full">
      <WaxingBg />
      <Image
        src="/moon-bg-60.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}
export const BG4: Story = {
  name: 'Waxing Gibbous',
  render: () => (
    <div className="h-screen w-full">
      <WaxingGibbousBg />
      <Image
        src="/moon-bg-60.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}
export const BG5: Story = {
  name: 'Full Moon',
  render: () => (
    <div className="h-screen w-full ">
      <FullMoonBg />
      <Image
        src="/moon-bg-60.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}
export const BG6: Story = {
  name: 'Waning Gibbous',
  render: () => (
    <div className="h-screen w-full">
      <WaningGibbousBg />
      <Image
        src="/moon-bg-60.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}
export const BG7: Story = {
  name: 'Last Quarter',
  render: () => (
    <div className="h-screen w-full">
      <LastQuarterBg />
      <Image
        src="/moon-bg-60.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}
export const BG8: Story = {
  name: 'Waning',
  render: () => (
    <div className="h-screen w-full">
      <WaningBg />
      <Image
        src="/moon-bg-60.png"
        alt="moon"
        layout="fill"
        style={{
          position: 'absolute',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />
    </div>
  ),
}
export default meta
