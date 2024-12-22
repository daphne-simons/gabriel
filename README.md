# Gabriel 2024

## A portfolio website for Designer, Ella Sutherland. 

### How to run in development: 

- To run the app, use the normal `localhost port:3000`
- To run the sanity studio, go to `localhost:3000/admin` 
- to run react-email preview - `npm run email`, go to `localhost:3600` 

### When Deploying: 

- Add any .env secrets or variables to the vercel project too. 
- If you have installed new packages, make sure to run `pnpm install` before pushing to main. Vercel wants latest pnpm lockfile too. Deploy will break if you don't do this. 

### Testing

- for UI / Visual component tests: `npm run storybook` 
- for Integration and unit tests: `npm run test` 

Extras/ mysteries: 

- Resend logins? 
