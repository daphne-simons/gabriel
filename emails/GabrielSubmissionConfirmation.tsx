import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Heading,
  Head,
  Font,
  Link
} from '@react-email/components'
export default function GabrielSubmissionConfirmation(submission: any, contributor: any) {
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
          <Heading style={{ fontSize: '24px', color: '#000', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300 }}>Dear Gabriel,</Heading>
          <Section>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>Hi Gabriel, {contributor.name} has submitted a contribution to the Gabriel Constellation Portal!</Text>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>
              Their submission included the following: {submission.name}.
              <br></br>
              Check it out live on the Gabriel Constellation now!
              <Link href="https://gabriel.exchange" style={{
                color: 'blue',
                fontFamily: 'Roboto, Arial, sans-serif',
                fontWeight: 300,
              }}>
                gabriel.exchange
              </Link>
            </Text>
          </Section>
        </Container >
      </Body >
    </Html>
  )
}
