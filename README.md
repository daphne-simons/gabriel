# Gabriel 2024

## A portfolio website for Designer, Ella Sutherland. 

### Key Scripts: 

`npm run dev` - runs the app in development mode.

`npm run build` - builds the app for production.

`npm run start` - starts the app in production mode.

`npm run storybook` - runs the storybook in development mode.

`npm run build-storybook` - builds the storybook for production.

`npm run test` - runs the tests in development mode.

### How to run in development: 

- To run the app, use the normal `localhost port:3000`
- To run the sanity studio, go to `localhost:3000/admin` - sign in with my github
- to run react-email preview - `npm run email`, go to `localhost:3600` 

### When Deploying: 

- Add any .env secrets or variables to the vercel project too. 
- If you have installed new packages, make sure to run `pnpm install` before pushing to main. Vercel wants latest pnpm lockfile too. Deploy will break if you don't do this. 

### Testing

- for UI / Visual component tests: `npm run storybook` 
- for Integration and unit tests: `npm run test` 
- For Playwright tests: 

Created a Playwright Test project at /Users/daphnesimons/personal-projects/gabriel/gabriel

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - ./tests/example.spec.ts - Example end-to-end test
  - ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
  - ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

### Extras/ mysteries: 

- Resend logins? 

### Example .env file structure: 

```js

// Sanity studio for CMS 
NEXT_PUBLIC_SANITY_HOOK_SECRET=

// email provider 
RESEND_API_KEY=

// rate limiting middleware 
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

```