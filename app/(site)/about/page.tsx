import Link from 'next/link'
// import Nav from '../components/Nav'
import AboutLogo from '../components/Logos/AboutLogo'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <>
      {/* Nav - custom for AboutPage*/}
      <div className="flex flex-row relative gap-4 p-2">
        <div className="flex justify-between mt-5 px-7 text-sm">
          <Link href="/">
            <AboutLogo />
          </Link>
          {/* TODO: Make underline lower */}
          <Link
            href="/about"
            className="hover:underline px-8 py-4 flex self-center"
          >
            About
          </Link>
        </div>
      </div>
      {/* Rest of About Page content */}
      <div className="pt-10 pb-14">
        <section className="flex justify-center text-center ">
          <article className="font-roboto text-xl w-2/3">
            Gabriel is a design studio led by{' '}
            <span className="text-googleBlue">Ella Sutherland</span>. <br></br>
            It works with a network of{' '}
            <span className="text-googleRed">artist consultants</span> to
            produce <br></br>
            <span className="text-googleGreen"> articulate</span> outcomes for
            the
            <span className="text-googleOrange"> cultural sector</span>.
          </article>
        </section>

        <div className="p-10 pt-20 flex flex-col items-center">
          <section className="w-5/6 grid grid-cols-2 gap-20 place-content-evenly">
            <article className="font-roboto text-2xl w-2/3">
              <h2>Gabriel</h2>
              <p className="pt-2 text-base text-googleGray">
                140–142 McEvoy Street, <br></br>Alexandria, Sydney 2015, AU
              </p>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              <h2>Contact</h2>
              <p className="pt-2 text-base text-googleGray">
                more@gabriel.exchange
              </p>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              <h2>Team</h2>
              <p className="pt-2 text-base text-googleGray">
                Ella Sutherland, Creative Director <br></br>
                Daphne Simons, Add title
              </p>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              Consultants{' '}
              <p className="pt-2 text-base text-googleGray">
                Add name, add name, add name, add name, add name, add name
              </p>
            </article>
          </section>
          <section className="w-5/6 pt-20">
            <article className="w-11/12 text-2xl font-normal font-roboto">
              Past Clients and Collaborators
            </article>
            <article className="w-11/12 pt-5 text-lg font-roboto text-googleGray">
              Agatha Gothe-Snape, Artspace Aotearoa, Artspace Sydney, Biennale
              of Sydney, Bree Richards, Brian Fuata, Brooke Stamp, CoCA Centre
              of Contemporary Art, Christchurch Art Gallery, Diana Baker Smith,
              Eleanor Weber, Enjoy Contemporary Art Space, EO Gill, Field
              Theory, Frances Barrett, Govett-Brewster Art Gallery, Henry
              Davidson, Hocken Collections, Holly Best, Imogen Taylor, Jonathan
              Jones, Kaldor Public Art Projects, Live Art Development Agency,
              Melissa Ratliff, Mitch Cairns, Monash University Museum of Art,
              Rafaela Pandolfini, SCAPE Public Art, Salote Tawale, Sarah
              Rodigari, ST PAUL St Gallery, Sumer, The Blue Oyster, The
              Commercial, The National, The Physics Room, UNSW, UTP, Veronica
              Tello
            </article>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
