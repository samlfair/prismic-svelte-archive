import { createClient, getEndpoint } from '@prismicio/client'
import { asText, asHTML, asLink, asDate } from '@prismicio/helpers'
import MagicString from 'magic-string'

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
  const client = createClient(endpoint, {
    fetch,
    req,
    ...options,
  })
  client.get()
  return client
}

const usePrismic = ({ repoName, routes, accessToken, options, slices }) => {
  return {
    markup: ({ content, filename }) => {
      const sourceFolder = process.cwd() + `/src/`
      const isInSrc = filename.indexOf(sourceFolder) >= 0
      if (isInSrc) {
        // Will not insert prismic if there is no script tag
        // Must create script tag if there is none
        let regex = /<script.*>/
        const match = content.match(regex)
        const startScript = match[0].length
        const s = new MagicString(content, { filename })
        const sliceZonePos = content.indexOf('SliceZone')
        const prismicPos = content.indexOf('prismic')
        if (sliceZonePos >= 0) {
          s.appendRight(
            startScript,
            `import SliceZone from 'prismic-svelte/SliceZone.svelte'; `,
          )
        }
        if (prismicPos >= 0) {
          // Routes / options are not working
          s.appendRight(
            startScript,
            `import { prismic } from 'prismic-svelte'; prismic.client = prismic.Client("${repoName}", ${JSON.stringify(
              { routes, ...options },
            )}); `,
          )
        }
        if (prismicPos >= 0 || sliceZonePos >= 0) {
          return {
            code: s.toString(),
            map: s.generateMap(),
          }
        }
      }
      return {
        code: content,
      }
    },
  }
}

const Client = (repoName, options) => {
  const endpoint = getEndpoint(repoName)
  return (session = null, fetch = null) =>
    addHeadersToClient(endpoint, session, fetch, options)
}

const prismic = {
  asText,
  asHTML,
  asLink,
  asDate,
  Client,
}

export { usePrismic, prismic }
