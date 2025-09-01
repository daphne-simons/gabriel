import {
  Body,
  Container,
  Html,
  Section,
  Text,
  Heading,
  Head,
  Font
} from '@react-email/components'
export default function MagicConfirmation(magicContributors: {
  contributor: any
  magicLink: string
}[]) {
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
          <Heading style={{ fontSize: '24px', color: '#000', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300 }}>Dear Gabriel,</Heading>
          <Section>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>The following Contributors have recieved their Magic Links for the Gabriel Constellation.</Text>
            {/* Map through array and format into a list for their Name: and Magic Link */}
            {magicContributors.map((magicContributor) => {
              return (
                <Text style={{
                  fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
                }} key={magicContributor.contributor._id}>
                  Name: {magicContributor.contributor.name} <br />
                  Magic Link: <a href={magicContributor.magicLink}>{magicContributor.magicLink}</a>
                </Text>
              )
            })}
          </Section>
          <Section>
            <Text style={{
              fontSize: '14px', color: '#666', fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 300
            }}>
              Their links expire in 7 days.
            </Text>
          </Section>
        </Container >
      </Body >
    </Html >
  )
}