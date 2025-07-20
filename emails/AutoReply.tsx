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
              'Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
            fontWeight: 275,
            width: '100%',
            textAlign: 'left',
          }}
        >
          {/* TITLE */}
          <Head>
            <Text
              // TODO: Add an img for the Gabriel logo. Email doesn't support custom fonts.
              style={{
                fontFamily: 'times, serif',
                fontSize: '38px',
              }}
            >
              Gabriel
            </Text>
          </Head>
          {/* BODY */}
          <Section>
            <Text
              style={{
                fontSize: '18px',
              }}
            >
              Hi {person.name},
              <br />
              Thanks for your enquiry about the {person.gem} {person.chosenCategory}.
              <br />
              We’ll be in touch shortly with more information.
              <br />
              Warmly, Gabriel
            </Text>
          </Section>
          {/* FOOTER */}
                <Section
                  style={{
                  paddingTop: '40px',
            color: '#1c73EB',
            }}  
          > 
            < Text
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
          
          
            tion style={{ fontSize: '11px', }}>
              t
              yle={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }
            
            Follow us
            {/* TODO: find out why this logo is not appearing in the real emails.  */}
                 href="https://www.instagram.com/gabriel_exchange/?utm_source=ig_web_button_share_sheet" style={{
                
                mg width="50" height="50" src="https://img.icons8.com/ios/50/instagram-new--v1.png" alt="instagram-new--v1" style={{
                width: '20px',
                height: '20px',
                paddingLeft: '10px',
              }} />
            </Link>
            Text>
            ext>
            We acknowledge and pay respect to the Traditional Owners and
            Elders—past, present and emerging—of the lands on which we
            operate.
          </Text>
        </Section>
        </Container>
      </Body>
    </Html >
  )
}

export default AutoReplyEmail
