import { Suspense } from 'react'
import EnquiryPage from '../components/Enquiry/EnquiryPage'

export default function Enquiry() {
  return (
    <Suspense>
      <EnquiryPage />
    </Suspense>
  )
}
