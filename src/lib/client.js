import { createClient, getEndpoint } from '@prismicio/client'

const initClient = (
  repoName = null,
  session = { cookie: null },
  fetch = null,
  options = {},
) => {
  if (typeof repoName !== 'string')
    throw 'Please specify an endpoint as a string.'
  const endpoint = getEndpoint(repoName)
  const { cookie } = session
  const req = {
    headers: {
      cookie,
    },
  }
  const client = createClient(endpoint, {
    fetch,
    req,
    defaultParams: {
      ...options,
    },
  })
  client.get()
  return client
}

const setClientOptions = (repoName, options) => {
  return (session = null, fetch = null) =>
    initClient(repoName, session, fetch, options)
}

export { setClientOptions, initClient }
