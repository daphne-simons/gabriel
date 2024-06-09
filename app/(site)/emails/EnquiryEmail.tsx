import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
} from '@react-email/components'

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

const EnquiryEmail = ({ person }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text>
              Hi Ella, you just got an enquiry from {person.firstName}!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EnquiryEmail
