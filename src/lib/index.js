import { createClient, getEndpoint } from '@prismicio/client'
import { asText, asHTML, asLink, asDate } from '@prismicio/helpers'
import MagicString from 'magic-string'

const addHeadersToClient = (
  endpoint = null,
  session = { cookie: null },
  fetch = null,
) => {
  if (typeof endpoint !== 'string')
    throw 'Please specify an endpoint as a string.'
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
  // This will error if there are two module script elements
  // Must handle
  return {
    script: ({ content, filename, markup, attributes }) => {
      if (attributes.context === 'module') {
        const s = new MagicString(content, { filename })
        const sliceZonePos = markup.indexOf('SliceZone')
        const prismicPos = markup.indexOf('prismic')
        const clientPos = markup.indexOf('Client')
        if (sliceZonePos >= 0) {
          s.prepend(`import SliceZone from 'prismic-svelte/SliceZone.svelte'; `)
        }
        if (prismicPos >= 0) {
          s.prepend(
            `import { prismic } from 'prismic-svelte'; prismic.client = prismic.Client("${repoName}"); `,
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

const Client = (repoName) => {
  const endpoint = getEndpoint(repoName)
  return (session = null, fetch = null) =>
    addHeadersToClient(endpoint, session, fetch)
}

const prismic = {
  asText,
  asHTML,
  asLink,
  asDate,
  Client,
}

export { usePrismic, prismic }
