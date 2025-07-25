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