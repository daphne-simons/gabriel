import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="text-xs pl-40 pr-20 pt-8 flex flex-col bg-lightGrayText w-full w-[100%]">
      <div className="flex flex-row pb-8">
        <p className="">Follow us</p>
        {/* TODO: find out why this logo is not appearing in the real emails.  */}
        <div className="pl-4 -mt-[2.5px]">
          <Link href="https://www.google.com">
            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />{' '}
          </Link>
        </div>
      </div>
      <div className="border border-bottom border-[#E5E7EB] w-[85%]"></div>
      <div className="pt-8 pb-8">
        We acknowledge and pay respect to the Traditional Owners and
        Elders—past, present and emerging—of the lands on which we operate.
      </div>
    </div>
  )
}
