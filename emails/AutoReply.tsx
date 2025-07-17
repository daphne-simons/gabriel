import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Font,
  Section,
  Text,
} from '@react-email/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { UserQuery } from '@/app/(site)/models/users'
// import gramercyFont from './fonts/ABCGramercyFine-Regular-Trial.woff2'

const AutoReplyEmail = (person: UserQuery) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container
          style={{
            fontFamily:
              '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
            fontWeight: 275,
            width: '100%',
            textAlign: 'left',
          }}
        >
          <Section>
            <Text
              style={{
                fontSize: '18px',
              }}
            >
              {/* FOR STYLE TESTING */}
              {/* Hi Daphne, */}
              <br />
              <br />
              {/* DYNAMIC */}
              Hi {person.name},<br />
              {/* FOR STYLE TESTING */}
              Thank you for your enquiry about the {/* -------- */}
              {/* FOR STYLE TESTING  */}
              {/* <span
                style={{
                  color: '#EA4335',
                }}
              >
                premium
              </span> */}
              {/* DYNAMIC */}
              <span style={{ color: '#EA4335' }}> {person.gem}</span>{' '}
              {/* FOR STYLE TESTING */}
              {/* <span
                style={{
                  color: '#34A853',
                }}
              >
                identity
              </span>{' '}
              package, */}
              {/* DYNAMIC */}
              <span style={{ color: '#34A853' }}>{person.chosenCategory}</span>,
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
              // most email providers don't support custom fonts, so will have to use basic fonts
              // 0R an img for the Gabriel logo.
              style={{
                fontFamily: 'times, serif',
                fontSize: '38px',
              }}
            >
              Gabriel
            </Text>
            <Text
              style={{
                fontSize: '12px',
                marginTop: '-25px',

                color: '#1c73EB',
              }}
            >
              <br />
              140–142 McEvoy Street,
              <br />
              Alexandria, Sydney 2015, AU
              <br />
              <Link
                href="https://gabriel.exchange"
                style={{
                  color: '#1c73EB',
                }}
              >
                gabriel.exchange
              </Link>
            </Text>
          </Section>

          <Section>
            <Text
              style={{
                fontSize: '10px',
              }}
            >
              Follow us
              {/* TODO: find out why this logo is not appearing in the real emails.  */}
              <span style={{}}>
                <Link href="https://www.instagram.com/gabriel_exchange/?utm_source=ig_web_button_share_sheet">
                  {/* <FontAwesomeIcon
                    icon={faInstagram}
                    style={{
                      width: '14px',
                      marginBottom: '-5px',
                      paddingLeft: '12px',
                      color: 'black',
                    }}
                  />{' '} */}
                  <img
                    src="/ig-icon.jpg"
                    alt="Instagram"
                    style={{
                      width: '14px',
                      height: '14px',
                      marginBottom: '-2px',
                      paddingLeft: '12px',
                    }}
                  />
                </Link>
              </span>
              <br />
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
