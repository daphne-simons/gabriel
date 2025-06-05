import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../app/(site)/components/Home/HomePage'; // Adjust the import path as needed

// Mock category data
const mockCategories = [
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

// Mock moon phase themes
const moonPhaseThemes = {
  newMoon: {
    bgColor: "bg-skin-newMoon",
    bgImg: "bg-moon-bg-0",
    btnSearchBg: "bg-btnSearchNewMoon",
    hoverSearchBg: "hover:bg-hoverSearchNewMoon",
    id: 0,
    outlineColor: "hover:outline outline-skin-newMoon outline-[0.5px]",
    textColor: "text-skin-newMoon"
  },
  waxingCrescent: {
    bgColor: "bg-skin-waxingCrescent",
    bgImg: "bg-moon-bg-25",
    btnSearchBg: "bg-btnSearchWaxingCrescent",
    hoverSearchBg: "hover:bg-hoverSearchWaxingCrescent",
    id: 1,
    outlineColor: "hover:outline outline-skin-waxingCrescent outline-[0.5px]",
    textColor: "text-skin-waxingCrescent"
  },
  firstQuarter: {
    bgColor: "bg-skin-firstQuarter",
    bgImg: "bg-moon-bg-50",
    btnSearchBg: "bg-btnSearchFirstQuarter",
    hoverSearchBg: "hover:bg-hoverSearchFirstQuarter",
    id: 2,
    outlineColor: "hover:outline outline-skin-firstQuarter outline-[0.5px]",
    textColor: "text-skin-firstQuarter"
  },
  waxingGibbous: {
    bgColor: "bg-skin-waxingGibbous",
    bgImg: "bg-moon-bg-75",
    btnSearchBg: "bg-btnSearchWaxingGibbous",
    hoverSearchBg: "hover:bg-hoverSearchWaxingGibbous",
    id: 3,
    outlineColor: "hover:outline outline-skin-waxingGibbous outline-[0.5px]",
    textColor: "text-skin-waxingGibbous"
  },
  fullMoon: {
    bgColor: "bg-skin-fullMoon",
    bgImg: "bg-moon-bg-100",
    btnSearchBg: "bg-btnSearchFullMoon",
    hoverSearchBg: "hover:bg-hoverSearchFullMoon",
    id: 4,
    outlineColor: "hover:outline outline-skin-fullMoon outline-[0.5px]",
    textColor: "text-skin-fullMoon"
  },
  waningGibbous: {
    bgColor: "bg-skin-waningGibbous",
    bgImg: "bg-moon-bg-75",
    btnSearchBg: "bg-btnSearchWaningGibbous",
    hoverSearchBg: "hover:bg-hoverSearchWaningGibbous",
    id: 5,
    outlineColor: "hover:outline outline-skin-waningGibbous outline-[0.5px]",
    textColor: "text-skin-waningGibbous"
  },
  lastQuarter: {
    bgColor: "bg-skin-lastQuarter",
    bgImg: "bg-moon-bg-50",
    btnSearchBg: "bg-btnSearchLastQuarter",
    hoverSearchBg: "hover:bg-hoverSearchLastQuarter",
    id: 6,
    outlineColor: "hover:outline outline-skin-lastQuarter outline-[0.5px]",
    textColor: "text-skin-lastQuarter"
  },
  waningCrescent: {
    bgColor: "bg-skin-waningCrescent",
    bgImg: "bg-moon-bg-25",
    btnSearchBg: "bg-btnSearchWaningCrescent",
    hoverSearchBg: "hover:bg-hoverSearchWaningCrescent",
    id: 7,
    outlineColor: "hover:outline outline-skin-waningCrescent outline-[0.5px]",
    textColor: "text-skin-waningCrescent"
  }
};

// Mock moon data generator
const createMockMoonData = (lightingValue: number) => ({
  phase: Array.from({ length: 32 }, (_, i) => ({
    lighting: i === new Date().getDate() ? lightingValue : Math.random() * 100
  }))
});

// Create a mock for the getMoon function
const mockGetMoon = (lightingValue: number) =>
  Promise.resolve(createMockMoonData(lightingValue));

// Create a simplified component wrapper that provides mock data
const HomePageWithMockData = ({ categories, mockLightingValue }: { categories: any[], mockLightingValue: number }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity, // Prevent refetching
      },
    },
  });

  // Pre-populate the query cache with mock data
  queryClient.setQueryData(['moon'], createMockMoonData(mockLightingValue));

  return (
    <QueryClientProvider client={queryClient}>
      <HomePage categories={categories} />
    </QueryClientProvider>
  );
};

// Simple decorator to provide QueryClient context
const QueryClientDecorator = (Story: any) => {
  return <Story />;
};

const meta: Meta<typeof HomePageWithMockData> = {
  title: 'Pages/HomePage',
  component: HomePageWithMockData,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [QueryClientDecorator],
  tags: ['autodocs'],
  argTypes: {
    categories: {
      description: 'Array of category objects for the search functionality',
    },
    mockLightingValue: {
      description: 'Mock lighting value to test different moon phases (0-100)',
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewMoon: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during New Moon phase (0% lighting) - darkest theme',
      },
    },
  },
};

export const WaxingCrescent: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 25,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during Waxing Crescent phase (25% lighting)',
      },
    },
  },
};

export const FirstQuarter: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during First Quarter phase (50% lighting)',
      },
    },
  },
};

export const WaxingGibbous: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 75,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during Waxing Gibbous phase (75% lighting)',
      },
    },
  },
};

export const FullMoon: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during Full Moon phase (100% lighting) - brightest theme',
      },
    },
  },
};

export const WaningGibbous: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 75,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during Waning Gibbous phase (75% lighting)',
      },
    },
  },
};

export const LastQuarter: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during Last Quarter phase (50% lighting)',
      },
    },
  },
};

export const WaningCrescent: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 25,
  },
  parameters: {
    docs: {
      description: {
        story: 'HomePage during Waning Crescent phase (25% lighting)',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    categories: mockCategories,
    mockLightingValue: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive story with adjustable lighting value. Use the controls to test different moon phases.',
      },
    },
  },
};