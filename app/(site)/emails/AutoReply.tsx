import Link from 'next/link'

interface EmailTemplateProps {
  person: {
    firstName: string
    email: string
    chosenService: string
    gem: string
    level: string
    cost: string
  }
}

export default function AutoReply({ person }: EmailTemplateProps) {
  console.log('auto-reply e-template', person)

  // const fakePerson = {
  //   firstName: 'D6',
  //   email: 'daphnejasminesimons@gmail.com',
  //   chosenService: 'ephemera',
  //   gem: 'Sapphire',
  //   level: 'Essential Identity',
  //   cost: '2000-4000',
  // }
  const { firstName, email, chosenService, gem, level, cost } = person

  return (
    <div>
      <h2>
        test
        <section className="flex justify-center text-center ">
          <article className="font-roboto text-xl w-2/3">
            Hi {person.firstName},<br></br>
            Thank you for your interest in a{' '}
            <span className="text-[#EA4335]"> {gem}</span>{' '}
            <span className="text-[#34A853]">{chosenService}, </span> <br></br>
            we’ll be back in touch shortly.
            <br></br>
            Gabriel
          </article>
        </section>
      </h2>

      <div className="p-10 pt-20 flex ">
        <section className="w-5/6 grid grid-cols-2 gap-20 place-content-evenly">
          <article className="text-2xl w-2/3 text-[#1C73E8]">
            <h2 className="font-gramercy">Gabriel</h2>
            <p className="pt-2 text-base ">
              140–142 McEvoy Street, <br></br>Alexandria, Sydney 2015, AU
              <br></br>
              <Link href="https://gabriel.exchange">gabriel.exchange</Link>
            </p>
          </article>

          <article className="font-roboto text-2xl w-2/3 text-[#202124]">
            <h2>Follow us</h2>
            <p>i</p>
            <p>
              We acknowledge and pay respect to the Traditional Owners and
              Elders—past, present and emerging—of the lands on which we
              operate. 
            </p>
          </article>
        </section>
      </div>
    </div>
  )
}
