import { createClient, getEndpoint } from '@prismicio/client'
import { asText, asHTML, asLink, asDate } from '@prismicio/helpers'
import MagicString from 'magic-string'
import defineClientEndpoint from './defineClientEndpoint'
import { scriptRegex } from './regexes'

const usePrismic = ({ repoName, routes, accessToken, options, slices }) => {
  return {
    markup: ({ content, filename }) => {
      const sourceFolder = process.cwd() + `/src/`
      const isInSrc = filename.indexOf(sourceFolder) >= 0
      if (isInSrc) {
        // Will not insert prismic if there is no script tag
        // Must create script tag if there is none
        const match = content.match(scriptRegex)
        const startScript = match[0].length
        const s = new MagicString(content, { filename })
        const hasSliceZone = content.indexOf('SliceZone') >= 0
        const hasPrismic = content.indexOf('prismic') >= 0
        if (hasSliceZone) {
          s.appendRight(
            startScript,
            `import SliceZone from 'prismic-svelte/SliceZone.svelte'; `,
          )
        }
        if (hasPrismic) {
          // Routes / options are not working
          s.appendRight(
            startScript,
            `import { prismic } from 'prismic-svelte'; prismic.client = prismic.defineClientEndpoint("${repoName}", ${JSON.stringify(
              { routes, ...options },
            )}); `,
          )
        }
        if (hasSliceZone || hasPrismic) {
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

const prismic = {
  asText,
  asHTML,
  asLink,
  asDate,
  defineClientEndpoint,
}

export { usePrismic, prismic }
