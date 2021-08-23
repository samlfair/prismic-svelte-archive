const addHeadersToClient = (
  endpoint = null,
  session = { cookie: null },
  fetch = null,
  options = {},
) => {
  if (typeof endpoint !== 'string')
    throw 'Please specify an endpoint as a string.'
  const { cookie } = session
  const req = {
    headers: {
      cookie,
    },
  }
  const client = defineClientEndpoint(endpoint, {
    fetch,
    req,
    defaultParams: {
      ...options,
    },
  })
  client.get()
  return client
}

const defineClientEndpoint = (repoName, options) => {
  const endpoint = getEndpoint(repoName)
  return (session = null, fetch = null) =>
    addHeadersToClient(endpoint, session, fetch, options)
}

export default defineClientEndpoint
