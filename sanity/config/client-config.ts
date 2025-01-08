import 'server-only'
import { createClient, type QueryParams } from 'next-sanity'

const config = {
  projectId: 'z5623np1',
  dataset: 'production',
  apiVersion: '2024-03-16', // todays date (USA format)
  useCdn: false, // gives more up to date changes - no default cache
  // https://github.com/sanity-io/next-sanity?tab=readme-ov-file#should-usecdn-be-true-or-false
}

const client = createClient(config)

// NEW VERSION WITH SANITY FETCH WEBHOOK:
// Refer to this documentation:
// https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs#step-4-configure-revalidatetag-in-sanity-client
// sanityFetch EXPLAINER: This async function acts as a wrapper function that exports client.fetch with the revalidateTag specified inside next. Instead of exporting the client, the sanityFetch() function will be used to query the datasets.
export async function sanityFetch<QueryResponse>({
  query,
  qParams = {},
  tags,
}: {
  query: string
  qParams?: QueryParams
  tags: string[]
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    cache: 'force-cache',
    next: { tags },
  })
}

export default config
