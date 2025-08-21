import {
  Body,
  Container,
  Html,
  Link,
  Section,
  Text,
  Hr,
  Heading,
  Img,
  Head,
  Font
} from '@react-email/components'

import { UserQuery } from '@/app/(site)/models/users'

const AutoReplyEmail = (person: UserQuery) => {

  // Reformat chosenCategory to remove "a" and "an"
  let reformattedService = ""
  if (person.chosenCategory === "a design subscription" || person.chosenCategory === "a website" || person.chosenCategory === "a publication") {
    const splitArr = person.chosenCategory.split(" ")
    const newString = splitArr.length === 2
      ?
      `${splitArr[1]}`
      :
      `${splitArr[1]} ${splitArr[2]}`

    reformattedService = newString
  } else if (person.chosenCategory === "an identity") {
    const splitArr = person.chosenCategory.split(" ")
    const newString = `${splitArr[1]}`
    reformattedService = newString
  }

  return (
    <Html>
      <Head>
        {/* Roboto Light (300) */}
        <Font fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2",
            format: "woff2",
          }}
          fontWeight={300}
        />
        {/* Roboto Regular (400) */}
        <Font fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
        />
        {/* Roboto Medium (500) */}
        <Font fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2",
            format: "woff2",
          }}
          fontWeight={500}
        />
      </Head>
      <Body>
        <Container
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* TITLE */}
          <Heading>
            {/* <Text
              style={{
                marginTop: '50px',
                fontFamily: 'times, serif',
                fontSize: '38px',
                color: '#E36E00',
              }}
            >
              Gabriel
            </Text> */}
            {/* Logo as Image component*/}
            <Img
              src={`${process.env.NEXT_PUBLIC_SITE_URL}/gabriel-logo.png`} alt="Gabriel Logo"
              style={{
                marginTop: '80px',
                height: '80px',
                width: 'auto',
                display: 'block',
                margin: '80px auto 0 auto', // Centers the image
              }} />
          </Heading>

          {/* BODY */}
          <Section>
            <Text
              style={{
                marginTop: '50px',
                marginBottom: '50px',
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 400,
                fontSize: '25px',
                lineHeight: '1.4',
                color: '#000000',
                textAlign: 'left'
              }}
            >
              Hi {person.name},
              <br />
              <br />
              Thanks for your enquiry about the {person.level.toLowerCase()} {reformattedService} package.
              <br />
              <br />
              {`We'll be in touch shortly with more information.`}
              <br />
              <br />
              Warmly,
              <br />
              Gabriel
            </Text>
          </Section>
          <Hr />

          {/* FOOTER */}

          <Section
            style={{
              width: '70%',
              paddingTop: '50px'
            }}
          >
            <Text style={{
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '14px',
              color: '#5F6368',
            }}>
              Gabriel is a design studio led by Ella Sutherland.
              <br />
              We work with a network of artist consultants to produce
              articulate outcomes for the cultural sector.
            </Text>
          </Section>

          <Section style={{
            width: '40%',
          }}>
            <Text style={{
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: '14px',
              color: '#5F6368',
            }}>
              140–142 McEvoy Street,
              <br />
              Alexandria, Sydney 2015, AU
              <br />
              <br />
              <br />
            </Text>

            <Text style={{
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              lineHeight: '14px',
              color: '#5F6368',
            }}>

              <Link href="mailto:more@gabriel.exchange" style={{
                color: '#5F6368',
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 300,
              }}>
                more@gabriel.exchange
              </Link>
              <br />
              <Link href="https://gabriel.exchange" style={{
                color: '#5F6368',
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 300,
              }}>
                gabriel.exchange
              </Link>
              <br />
              <br />
              <br />
            </Text>

            <Text style={{
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 300,
              fontSize: '12px',
              color: '#5F6368',
            }}>
              <Link href="https://www.instagram.com/gabriel_exchange/?utm_source=ig_web_button_share_sheet" style={{
                color: '#5F6368',
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 300,
              }}>
                Follow us
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html >
  )
}

export default AutoReplyEmail