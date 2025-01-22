import { UserQuery } from '@/app/(site)/models/users'
import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Text,
  Row,
  Column,
  Heading,
} from '@react-email/components'

const EnquiryEmail = (person: UserQuery) => {
  return (
    <Html>
      <Head />
      <Body style={{ width: '100%' }}>
        <Container>
          <Section>
            <Heading>
              Hi Gabriel, my name is {person.name} and I would like to know more
              about...{' '}
            </Heading>
            <Row>
              <Column>🟡</Column>
              <Column>
                <Text>Service: {person.chosenCategory}</Text>
              </Column>
            </Row>
            <Row>
              <Column>🔵</Column>
              <Column>
                <Text>Level / Gem: {person.gem}</Text>
              </Column>
            </Row>
            <Row>
              <Column>🟢</Column>
              <Column>
                <Text>Cost Estimate: {person.cost}</Text>
              </Column>
            </Row>
            <Row>
              <Column>🔴</Column>
              <Column>
                <Text>Contact me at: {person.email}</Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EnquiryEmail
