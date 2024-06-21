import type { Meta, StoryObj } from '@storybook/react'

import HomeLogo from '../app/(site)/components/HomeLogo'
// import Background from '../app/(site)/components/BackGround'

const meta: Meta<typeof HomeLogo> = {
  title: 'HomeLogo',
  component: HomeLogo,
}

type Story = StoryObj<typeof HomeLogo>

export const HeadingHome: Story = {
  name: 'Home Logo - fixed settings',
  render: () => (
    // <Background>
    <div className="flex justify-center items-center h-screen p-40">
      <HomeLogo fontSettings={{ wght: 1000, opsz: 72 }} />
    </div>
    // </Background>
  ),
}

// export const emptyTextBox: Story = {
//   name: 'Empty text box',
//   render: () => (
//     <Background>
//       <div className="flex justify-center items-center h-screen p-40">
//         <TextBox placeholder="Enter here" />
//       </div>
//     </Background>
//   ),
// }

// export const multipleEmptyTextBoxes: Story = {
//   name: 'Multiple empty text boxes',
//   render: () => (
//     <Background>
//       <div className="flex gap-4 flex-col justify-center items-center h-screen p-40">
//         <TextBox placeholder="The full title of the song" />
//         <TextBox placeholder="Name of the artist / singer / group" />
//         <TextBox placeholder="Genre of music (optional)" />
//         <TextBox placeholder="A link so others can listen (optional)" />
//       </div>
//     </Background>
//   ),
// }

// export const multiplePopulatedTextBoxes: Story = {
//   name: 'Multiple populated text boxes',
//   render: () => (
//     <Background>
//       <div className="flex gap-4 flex-col justify-center items-center h-screen p-40">
//         <TextBox defaultValue="Reropolis" />
//         <TextBox defaultValue="Zayne Murrel" />
//         <TextBox defaultValue="Retrowave" />
//         <TextBox defaultValue="https://www.youtube.com/watch?v=-JdOeRAqNBU" />
//       </div>
//     </Background>
//   ),
// }

export default meta
