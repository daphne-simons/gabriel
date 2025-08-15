import 'server-only'
import { createClient } from 'next-sanity'
import config from './client-config'

// Create a write client with token for mutations
export const writeClient = createClient({
  ...config,
  useCdn: false, // Always use live API for writes
  token: process.env.SANITY_API_TOKEN, // Write token
})

// Export for asset uploads and document creation
export default writeClient