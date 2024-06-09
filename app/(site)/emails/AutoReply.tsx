import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Section,
  Text,
} from '@react-email/components'

interface EmailTemplateProps {
  person: {
    firstName: string
    email: string
    chosenService: string
    gem: string
  }
}

const AutoReplyEmail = ({ person }: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Section>
            <Text style={{ textAlign: 'center' }}>
              Hi {person.firstName},<br />
              Thank you for your interest in{' '}
              <span style={{ color: '#EA4335' }}>{person.gem}</span>
              {', '}
              <span style={{ color: '#34A853' }}>{person.chosenService}</span>,
              <br />
              we’ll be back in touch shortly.
              <br />
              Gabriel
            </Text>
          </Section>

          <Section>
            <Text>
              Gabriel
              <br />
              140–142 McEvoy Street,
              <br />
              Alexandria, Sydney 2015, AU
              <br />
              <Link href="https://gabriel.exchange">gabriel.exchange</Link>
            </Text>
          </Section>

          <Section>
            <Text>Follow us (instagram icon)</Text>
          </Section>
          <Section>
            <Text>
              We acknowledge and pay respect to the Traditional Owners and
              Elders—past, present and emerging—of the lands on which we
              operate.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default AutoReplyEmail
