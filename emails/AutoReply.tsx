import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Section,
  Text,
} from '@react-email/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

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
        <Container
          style={{
            fontFamily:
              '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
          }}
        >
          <Section>
            <Text style={{ fontSize: '18px' }}>
              {/* FOR STYLE TESTING */}
              Hi Daphne,
              <br />
              <br />
              {/* FOR STYLE TESTING */}
              Thank you for your enquiry about the {/* DYNAMIC */}
              {/* DYNAMIC */}
              {/* Hi {person.firstName},<br /> */}
              {/* FOR STYLE TESTING  */}
              <span style={{ color: '#EA4335' }}>premium</span>
              {/* DYNAMIC */}
              {/* <span style={{ color: '#EA4335' }}>{person.gem}</span> */}{' '}
              {/* FOR STYLE TESTING */}
              <span style={{ color: '#34A853' }}>identity</span> package,
              {/* DYNAMIC */}
              {/* <span style={{ color: '#34A853' }}>{person.chosenService}</span>, */}
              <br />
              we’ll be in touch shortly.
              <br />
              <br />
              Gabriel
            </Text>
          </Section>

          <Section
            style={{
              paddingTop: '40px',
              color: '#1c73EB',
            }}
          >
            <Text
              // CONNECT THIS FONT TO THE ACTUAL FONT. ? DO I NEED A FILE?
              style={{
                fontFamily: 'Gramercy Variable, serif',
                fontSize: '36px',
                paddingTop: 40,
              }}
            >
              Gabriel
            </Text>
            <Text style={{ fontSize: '12px', marginTop: '-25px' }}>
              <br />
              140–142 McEvoy Street,
              <br />
              Alexandria, Sydney 2015, AU
              <br />
              <Link href="https://gabriel.exchange">gabriel.exchange</Link>
            </Text>
          </Section>

          <Section>
            <Text style={{ fontSize: '10px' }}>
              Follow us
              <span style={{}}>
                <Link href="https://www.google.com">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{
                      width: '14px',
                      marginBottom: '-5px',
                      paddingLeft: '12px',
                      color: 'black',
                    }}
                  />{' '}
                </Link>
              </span>
              <br /> <br />
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
