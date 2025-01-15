import Link from 'next/link'
import AboutEnquireLogo from '../components/Logos/AboutEnquireLogo'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <>
      {/* Nav for AboutPage */}
      <div className="flex flex-row relative gap-4 p-2">
        <ul className="flex justify-between pt-2 px-5 text-sm">
          <Link href="/">
            <AboutEnquireLogo />
          </Link>
          <Link href="/about" className="flex self-center px-8 py-6 ">
            <li className=" pb-2 text-sm border-b-2 border-[#8AB4F7]">About</li>
          </Link>
        </ul>
      </div>
      {/* About Page content */}
      <main className="pt-10 pb-24 px-20">
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

        <div className="pt-20 flex flex-col items-center">
          <section className="w-5/6 grid grid-cols-2 gap-20 place-content-evenly">
            <article className="font-roboto text-2xl w-2/3">
              <h2>Gabriel</h2>
              <p className="py-2 text-base text-googleMidGray pb-10 ">
                140–142 McEvoy Street, <br></br>Alexandria, Sydney 2015, AU
              </p>
              <button className="text-base text-googleBlue border border-2-lightGray hover:text-googleDarkBlue hover:border-googleBlue rounded-md px-6 py-2">
                View Map
              </button>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              <h2>Contact</h2>
              <p className="pt-2 pb-16 text-base text-googleMidGray">
                more@gabriel.exchange
              </p>
              <a
                className="text-base text-googleBlue hover:text-googleDarkBlue border border-2-lightGray hover:border-googleBlue rounded-md px-7 py-[10px]"
                // TODO: change this email address to Ella's official Gabriel Email
                href="mailto:daphnejasminesimons@gmail.com?subject=General%20Enquiry%20for%20Gabriel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email Us
              </a>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              <h2>Team</h2>
              <p className="pt-2 text-base text-googleMidGray">
                Ella Sutherland, Creative Director <br></br>
                Daphne Simons, Add title
              </p>
            </article>

            <article className="font-roboto text-2xl w-2/3">
              Consultants{' '}
              <p className="pt-2 text-base text-googleMidGray">
                Add name, add name, add name, add name, add name, add name
              </p>
            </article>
          </section>
          <section className="w-5/6 pt-20">
            <article className="w-11/12 text-2xl font-normal font-roboto">
              Past Clients and Collaborators
            </article>
            <article className="w-11/12 pt-5 text-lg font-roboto text-googleMidGray">
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
      </main>
      {/* Footer */}
      <div className="bg-googlelightGrayFooter bottom-0 w-full">
        <div className="flex flex-col items-center px-20">
          <Footer />
        </div>
      </div>
    </>
  )
}
