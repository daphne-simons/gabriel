import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="text-xs pt-8 flex flex-col max-md:w-full max-md:px-12 md:px-16 md:w-5/6 lg:text-sm xl:text-sm">
      <div className="flex flex-row pb-8">
        <p className="">Follow us</p>
        {/* TODO: find out why this logo is not appearing in the real emails.  */}
        <div className="pl-4 -mt-[2.5px]">
          <Link href="https://www.instagram.com/gabriel_exchange/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />{' '}
          </Link>
        </div>
      </div>
      <div className="border-[0.8px] border-bottom border-[#E5E7EB] w-[85%]"></div>
      <div className="pt-8 pb-10">
        We acknowledge and pay respect to the Traditional Owners and
        Elders—past, present and emerging—of the lands on which we operate.
      </div>
    </div >
  )
}
