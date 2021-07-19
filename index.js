import { createClient, getEndpoint } from '@prismicio/client'
import { asText, asHTML, asLink, asDate } from '@prismicio/helpers'

const createPrismicSvelte = ({ repoName }) => {
  const endpoint = getEndpoint(repoName)

  const Client = (session, fetch) => {
    const { cookie } = session
    const req = {
      headers: {
        // cookie,
        cookie,
      },
    }
    const client = createClient(endpoint, { fetch, req })
    return client
  }

  return {
    repoName,
    endpoint,
    asText,
    Client,
    asHTML,
    asLink,
    asDate,
  }
}

export default createPrismicSvelte
