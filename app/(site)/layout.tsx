import type { Metadata } from 'next'
import '../globals.css'
import ReactQueryProvider from '@/query/providers/ReactQueryProvider'
import { getMoonPhaseForWidget } from './utils/moon-utils';
import ScrollManager from './components/ScrollManager';



// have to call this fn above the async function
const moonPhase = getMoonPhaseForWidget()

export async function generateMetadata(): Promise<Metadata> {
  // Create dynamic favicon path based on current moon phase
  const faviconPath = moonPhase.img;

  return {
    title: `Gabriel`,
    description: ``,
    icons: {
      icon: faviconPath,
      apple: faviconPath,
      shortcut: faviconPath,
    },
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <main>
            {/* <ScrollManager /> */}
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
