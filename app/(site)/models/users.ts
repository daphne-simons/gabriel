import { z } from 'zod'

export const UserEmailQuery = z.object({
  name: z.string(),
  email: z.string(),
  chosenCategory: z.string(),
  gem: z.string(),
  level: z.string(),
  cost: z.string(),
})

export type UserQuery = z.infer<typeof UserEmailQuery>
