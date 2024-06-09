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

export default function EmailTemplate({ person }: EmailTemplateProps) {
  console.log('e-template', person)

  return (
    <div>
      <h1>Welcome, {person.firstName}!</h1>
    </div>
  )
}
