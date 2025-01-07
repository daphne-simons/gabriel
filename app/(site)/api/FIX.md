# FIX

- Code in the backend should be layered, meaning that routes should be doing
  routes things, like accessing `params` or `query`. Any other logic should be
  moved to another module and imported to be consumed in routes.
- NEVER trust POST requests. Always validate before processing the data.
- Log caught errors instead of send them to the caller.

```ts
// before
export async function POST(req: Request, res: Response) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const person = (await req.json()) as EmailTemplateProps;
  // ...
}
```

```ts
// after
import emailProvider from "./emailProvider";

export async function POST(req: Request, res: Response) {
  const input = await req.json();
  // parse with zod
  const person: EmailTemplateProps = validate(input);
  emailProvider.send(person);
  // ...
}
```
