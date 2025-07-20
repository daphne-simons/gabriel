import { UserQuery } from '@/app/(site)/models/users'
import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
} from '@react-email/components'

const EnquiryEmail = (person: UserQuery) => {
  return (
    <Html>
      <Head />
      <Body style={{ width: '100%', fontSize: '12px' }}>
        <Container>
          <Section>
            <Text>Name: {person.name}</Text>
            <Text>Email: {person.email}</Text>
            <Text>Selected Category/Service: {person.chosenCategory}</Text>
            <Text>Tier: {person.gem}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EnquiryEmail
