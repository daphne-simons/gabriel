import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import HomePage from '../app/(site)/components/Home/HomePage';
import { MOON_PHASES } from '../app/(site)/utils/moon-utils';
import BackGround from '@/app/(site)/components/BackGround';
import Link from 'next/link';
import MoonWidget from '@/app/(site)/components/MoonWidget';
import HomeLogo from '@/app/(site)/components/Logos/HomeLogo';
import HomeSearchBar from '@/app/(site)/components/Home/HomeSearchBar';

// Mock category data
const MOCK_CATEGORIES = [
  {
    details: [{}],
    name: "a design subscription",
    _id: "215870f2-9ffd-402b-bdf7-15062c5f5cc0"
  },
  {
    details: [{}],
    name: "ephemera",
    _id: "48210927-337a-42c3-b478-1c84edb0dbc9"
  },
  {
    details: [{}],
    name: "a website",
    _id: "62d8b332-291e-4a72-ba15-8d86f313d8c7"
  },
  {
    details: [{}],
    name: "a publication",
    _id: "7deb3ba6-7e00-46ca-9296-fd299da93257"
  },
  {
    details: [{}],
    name: "an identity",
    _id: "e121e9d6-3317-493a-b2dd-b71579be6b21"
  }
];

// Create a wrapper component that injects a specific moon phase theme
const HomePageWithMockedPhase = ({
  categories,
  moonPhase
}: {
  categories: any[],
  moonPhase: keyof typeof MOON_PHASES
}) => {
  // Create a modified HomePage that uses the mocked theme
  const ModifiedHomePage = React.useMemo(() => {
    // Get the theme for the specified moon phase
    const mockTheme = MOON_PHASES[moonPhase].bgTheme;
    const mockPhase = { name: MOON_PHASES[moonPhase].name, img: MOON_PHASES[moonPhase].img }

    // Create a component that overrides the calculateBgColor call
    return function MockedHomePage({ categories }: { categories: any[] }) {
      const [fontSettings, setFontSettings] = React.useState({ wght: 200, opsz: 72 });
      const [isOpen, setIsOpen] = React.useState(false);

      const updateText = (e: React.MouseEvent<HTMLDivElement>) => {
        const multiplierWidth = e.clientX / window.innerWidth;
        const multiplierOpsz = e.clientY / window.innerHeight;
        const randomWeight = multiplierWidth * (1000 - 200) + 200;
        const randomOpsz = multiplierOpsz * (72 - 12) + 12;

        setFontSettings({ wght: randomWeight, opsz: randomOpsz });
      };

      // Use the mocked theme instead of calculating it
      const theme = mockTheme;
      const phase = mockPhase
      const closeDropDown = () => {
        if (isOpen === false) return;
        else setIsOpen(!isOpen);
      };

      const Suspense = React.Suspense;

      return (
        <Suspense fallback={<div>Loading...</div>}>
          <div onMouseMove={updateText} onClick={closeDropDown}>
            <BackGround theme={theme}>
              <div className={`flex flex-col justify-between h-screen fill-current ${theme.textColor} z-20`}>
                {/* Nav */}
                <div className="flex justify-between mt-5 px-7 text-sm">
                  <Link href="/about" className="flex gap-8 hover:underline">
                    About
                  </Link>
                  <MoonWidget size={'smallMoon'} phase={phase} />
                </div>
                {/* Middle section */}
                <div className="relative middle flex flex-col justify-evenly items-center h-[30%] -top-44 max-md:-top-20">
                  <HomeLogo fontSettings={fontSettings} logoColor={theme.logoColor} />
                  <HomeSearchBar
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    categories={categories}
                    theme={theme}
                  />
                </div>
                <div></div>
              </div>
            </BackGround>
          </div>
        </Suspense>
      );
    };
  }, [moonPhase]);

  return <ModifiedHomePage categories={categories} />;
};

// Enhanced meta configuration
const meta: Meta<typeof HomePageWithMockedPhase> = {
  title: 'Pages/HomePage',
  component: HomePageWithMockedPhase,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        component: 'HomePage component that dynamically changes theme based on moon phases. Each story shows a different moon phase theme.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    categories: {
      description: 'Array of category objects for the search functionality',
      control: { type: 'object' },
    },
    moonPhase: {
      description: 'Moon phase to display',
      control: { type: 'select' },
      options: Object.keys(MOON_PHASES),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create stories with different moon phases
const createMoonPhaseStory = (
  phaseKey: keyof typeof MOON_PHASES,
  description: string
): Story => ({
  args: {
    categories: MOCK_CATEGORIES,
    moonPhase: phaseKey,
  },
  parameters: {
    docs: {
      description: {
        story: description,
      },
    },
  },
});

export const NewMoon: Story = createMoonPhaseStory(
  'NEW_MOON',
  'HomePage during New Moon phase (0-3% lighting) - darkest theme with pink accents'
);

export const WaxingCrescent: Story = createMoonPhaseStory(
  'WAXING_CRESCENT',
  'HomePage during Waxing Crescent phase (4-48% lighting) - transitional theme with gray accents'
);

export const FirstQuarter: Story = createMoonPhaseStory(
  'FIRST_QUARTER',
  'HomePage during First Quarter phase (49-52% lighting) - balanced theme with yellow accents'
);

export const WaxingGibbous: Story = createMoonPhaseStory(
  'WAXING_GIBBOUS',
  'HomePage during Waxing Gibbous phase (53-97% lighting) - bright theme with orange accents'
);

export const FullMoon: Story = createMoonPhaseStory(
  'FULL_MOON',
  'HomePage during Full Moon phase (98-100% lighting) - brightest theme with gray accents'
);

export const WaningGibbous: Story = createMoonPhaseStory(
  'WANING_GIBBOUS',
  'HomePage during Waning Gibbous phase (53-97% lighting) - waning theme with orange accents and dark text'
);

export const LastQuarter: Story = createMoonPhaseStory(
  'LAST_QUARTER',
  'HomePage during Last Quarter phase (49-52% lighting) - quarter theme with pink accents'
);

export const WaningCrescent: Story = createMoonPhaseStory(
  'WANING_CRESCENT',
  'HomePage during Waning Crescent phase (4-48% lighting) - waning theme with yellow accents'
);

// Story for testing responsive behavior
export const Mobile: Story = {
  args: {
    categories: MOCK_CATEGORIES,
    moonPhase: 'NEW_MOON',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'HomePage optimized for mobile view with responsive layout adjustments.',
      },
    },
  },
};

// Story for testing with no categories
export const NoCategories: Story = {
  args: {
    categories: [],
    moonPhase: 'FIRST_QUARTER',
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage with empty categories array to test edge case handling.',
      },
    },
  },
};