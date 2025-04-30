
import Footer from '../Footer'
import AboutEnquireLogo from '../Logos/AboutEnquireLogo'
import Link from 'next/link'
import EnquiryForm from '../EnquiryForm'

export default function EnquiryPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        {/* Enquiry Header */}
        <ul className="w-full flex max-md:justify-between gap-4 p-2 pt-2 px-5 text-sm">
          <Link href="/" className="pl-2">
            <AboutEnquireLogo />
          </Link>
          <Link href="/about" className="px-8 py-6">
            <li className="pb-2 text-sm border-[#ffffff] hover:border-[#8AB4F7] border-b-2">About</li>
          </Link>
        </ul>
        {/* Enquiry page content / form */}
        <div className="flex flex-col items-center justify-center">
          <div className="max-md:px-12 max-md:py-10 md:pb-10 md:px-36 md:pt-16 pb-2 xl:px-2">
            <EnquiryForm />
          </div>
        </div>
        {/* Footer */}
        <div className=" bg-googlelightGrayFooter bottom-0 w-full mt-auto">
          <div className="flex flex-col items-center">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
