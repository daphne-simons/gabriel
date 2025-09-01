import {
  Body,
  Container,
  Html,
  Link,
  Section,
  Text,
  Heading,
  Head,
  Font
} from '@react-email/components'
export default function MagicLink(contributor: any, magicLink: string) {
  return (

    <Html>
      {/* Head contains declared Fonts */}
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
          <Heading style={{ fontSize: '18px', color: '#000', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300 }}>Hi {contributor.name.split(' ')[0]},</Heading>
          <Section>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>The constellation is calling for your contribution. Share something that inspires you, intrigues you, or simply exists in your orbit right now.</Text>
          </Section>
          <Section style={{ textAlign: 'center', margin: '30px 0' }}>
            <Link href={`${magicLink}`} target="_blank"
              style={{
                display: 'inline-block', background: '#000', color: '#fff', padding: '12px 24px', textDecoration: 'none', borderRadius: '4px', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
              }}>
              Enter the Portal
            </Link>
          </Section>
          <Section>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>
              This link expires in 7 days. Questions? Reply to this email.
            </Text>
          </Section>
        </Container >
      </Body >
    </Html >
  )
}