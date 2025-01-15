import Link from 'next/link'

export default function Blocked() {
  return (
    <div>
      <main>
        <h3>Access blocked. Too many requests</h3>
        <Link href="/">Home</Link>
      </main>
    </div>
  )
}
