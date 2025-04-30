import type { Metadata } from 'next'
import '../globals.css'
import ReactQueryProvider from '@/query/providers/ReactQueryProvider'
import getMoon from '@/query/utils/getMoonData';

// Generate dynamic metadata for the app
export async function generateMetadata(): Promise<Metadata> {
  // Define moon phases with corresponding images
  const phases = [
    { name: 'New Moon', img: 'new', min: 0, max: 5 },
    { name: 'Waxing', img: 'waxing', min: 6, max: 42 },
    { name: 'First Quarter', img: 'first-q', min: 43, max: 60 },
    { name: 'Waxing Gibbous', img: 'waxing-g', min: 61, max: 95 },
    { name: 'Full Moon', img: 'full', min: 96, max: 105 },
    { name: 'Waning Gibbous', img: 'waning-g', min: 66, max: 95 },
    { name: 'Last Quarter', img: 'last-q', min: 44, max: 65 },
    { name: 'Waning', img: 'waning', min: 5, max: 43 },
  ];

  let currentPhaseImg = 'new'; // Default
  let phaseName = 'New Moon'; // Default

  try {
    // Get moon data
    const moonData = await getMoon();

    // Calculate current moon lighting
    const moonLighting = Number(moonData.phase[new Date().getDate()]?.lighting.toFixed(0)) || 80;
    // const moonLighting = 50; // Using fixed value for demonstration

    // Find the current phase
    const currentPhase = phases.find(
      phase => moonLighting >= phase.min && moonLighting <= phase.max
    );

    if (currentPhase) {
      currentPhaseImg = currentPhase.img;
      phaseName = currentPhase.name;
    }
  } catch (error) {
    console.error('Error fetching moon data:', error);
    // Use defaults if there's an error
  }

  // Dynamic favicon path based on current moon phase
  const faviconPath = `/moon-imgs/${currentPhaseImg}.png`;

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
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
