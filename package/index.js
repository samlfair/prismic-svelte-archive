import { createClient, getEndpoint } from '@prismicio/client'
import { asText, asHTML, asLink, asDate } from '@prismicio/helpers'
import { default as SliceZone } from './SliceZone.svelte'
import MagicString from 'magic-string'
import { composeSerializers } from '@prismicio/richtext'

const addHeadersToClient = (endpoint, session, fetch) => {
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

const $prismic = {
  SliceZone,
  asText,
  asHTML,
  asLink,
  asDate,
}

const prismic = $prismic

const usePrismic2 = ({ repoName }) => {
  const endpoint = getEndpoint(repoName)
  const Client = (session = null, fetch = null) =>
    addHeadersToClient(endpoint, session, fetch)

  return {
    markup: ({ content, filename }) => {
      const pos = content.indexOf('SliceZone')
      if (pos < 0) {
        return { code: content }
      }
      const s = new MagicString(content, { filename })
      s.prepend("import { SliceZone } from 'prismic-svelte'; ")
      let code = s.toString()
      let map = s.generateMap()
      return {
        code,
        map,
      }
    },
  }
}

export { SliceZone, asText, asHTML, asLink, asDate, usePrismic2, prismic }

export default $prismic
