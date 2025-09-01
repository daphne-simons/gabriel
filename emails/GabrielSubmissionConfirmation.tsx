// Sent to Gabriel
import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Heading,
  Head,
  Font,
  Link,
  Img
} from '@react-email/components'
export default function GabrielSubmissionConfirmation(submission: any, contributor: any) {

  console.log(submission)

  return (
    <Html>
      <Head>
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
        <Container style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Heading >
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
          <Section>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>Hi Gabriel, {contributor.name} has submitted a contribution to the Constellation Portal!</Text>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>
              Check it out live on the Gabriel Constellation now!
            </Text>
            <Link href="https://gabriel.exchange/moon" style={{
              color: 'blue',
              fontFamily: 'Roboto, Arial, sans-serif',
              fontWeight: 300,
            }}>
              gabriel.exchange/moon
            </Link>
          </Section>
        </Container >
      </Body >
    </Html>
  )
}
