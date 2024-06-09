interface EmailTemplateProps {
  person: {
    firstName: string
    email: string
    chosenService: string
    gem: string
    level: string
    cost: string
  }
}

export default function AutoReply({ person }: EmailTemplateProps) {
  console.log('auto-reply e-template', person)

  return (
    <div>
      <h1>This is an auto-reply. </h1>
      <h2>
        Thanks for your enquiry {person.firstName}. Gabriel will get back to you
        shortly
      </h2>
    </div>
  )
}
