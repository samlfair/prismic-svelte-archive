import { createClient, getEndpoint } from '@prismicio/client'
import { asText, asHTML, asLink, asDate } from '@prismicio/helpers'
import SliceZone from './SliceZone.svelte'

const addHeadersToClient = (endpoint, session, fetch) => {
  console.log('hi')
  const { cookie } = session
  const req = {
    headers: {
      cookie,
    },
  }
  const client = createClient(endpoint, { fetch, req })
  return client
}

const usePrismic = ({ repoName }) => {
  const endpoint = getEndpoint(repoName)
  const Client = (session, fetch) =>
    addHeadersToClient(endpoint, session, fetch)

  return {
    repoName,
    endpoint,
    asText,
    Client,
    asHTML,
    asLink,
    asDate,
    SliceZone,
  }
}

export default usePrismic
